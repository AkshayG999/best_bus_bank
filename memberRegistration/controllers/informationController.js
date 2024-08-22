const { Op } = require('sequelize');
const { isValid, parseISO } = require('date-fns');
const memberInformationService = require('../services/informationService');
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");
const branchService = require('../../master_data_entry/services/branchService');
const memberShipTypeService = require('../services/memberShipTypeService');
const memberStatusService = require('../services/memberStatusService');
const departmentService = require('../../master_data_entry/services/departmentService');
const depoService = require('../../master_data_entry/services/depoService');

// Helper function to validate dates
function validateDate(dateStr) {
    if (!dateStr) return true;

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) {
        return false;
    }
    const date = parseISO(dateStr);
    return isValid(date);
}
// Calculate DOR based on DOB
const calculateDOR = (dob) => {
    return moment(dob).add(60, 'years').format('YYYY-MM-DD');
};


exports.basicDetailsCreate = async (memberData, transaction) => {
    try {
        // Validate dates
        const dateFields = ['EntryDT', 'DOB', 'DOJBest', 'DojSoc'];
        for (const field of dateFields) {
            if (!validateDate(memberData[field])) {
                return { error: `${field} is not a valid date. Please provide it in YYYY-MM-DD format.` };
            }
        }

        // Validate or generate DOR
        if (memberData.DOR) {
            if (!validateDate(memberData.DOR)) {
                return { error: `DOR is not a valid date. Please provide it in YYYY-MM-DD format.` };
            }
        } else {
            // Generate DOR based on DOB + 60 years
            if (!validateDate(memberData.DOB)) {
                return { error: `DOB is not a valid date. Please provide it in YYYY-MM-DD format` };
            }
            memberData.DOR = calculateDOR(memberData.DOB);
        }

        const EntryNo = await procedureStoreController.generateGroupUniqueCode("member_information_EntryNo", "MEM", transaction);
        const mem_SrNo = await procedureStoreController.createRecordWithSrNo("member_information_mem_SrNo", transaction);
        console.log(EntryNo);
        console.log(mem_SrNo);

        // Check if ShareFolio is null, undefined, or not present, and generate if necessary
        if (!memberData.SHFOLIO) {
            memberData.SHFOLIO = await procedureStoreController.createRecordWithSrNo("member_information_SHFOLIO", transaction, 100000);
        }

        const branch = await branchService.getBranchById(memberData.Mem_Branch);
        if (!branch) {
            return { error: 'Branch not found! Provide valid Branch' };
        }
        const memberShipType = await memberShipTypeService.getMembershipTypeById(memberData.MemberShipType);
        if (!memberShipType) {
            return { error: 'memberShipType not found! Provide valid memberShipType' };
        }
        const memberShipStatus = await memberStatusService.getStatusById(memberData.MemberShipStatus);
        if (!memberShipStatus) {
            return { error: 'MemberShipStatus not found! Provide valid MemberShipStatus' };
        }

        const deptSrNo = await departmentService.findById(memberData.DeptSrNo);
        if (!deptSrNo) {
            return { error: 'DeptSrNo not found! Provide valid DeptSrNo' };
        }
        const depo_No = await depoService.getDepoById(memberData.Depo_No);
        if (!depo_No) {
            return { error: 'Depo_No not found! Provide valid Depo_No' };
        }
        if (!['1', '2', '3'].includes(memberData.Mem_Gender)) {
            return ({ error: 'Invalid gender in personalInfo. Please select from 1, 2, or 3' });
        }

        const newMember = await memberInformationService.createMember({ EntryNo, mem_SrNo, ...memberData }, transaction);
        return newMember;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

exports.basicDetailsGet = async (EntryNo) => {
    try {
        const member = await memberInformationService.basicDetailsGet(EntryNo);
        return member;
    } catch (error) {
        throw new Error(error);
    }
};
exports.getMember = async (filter = {}) => {
    try {

        const member = await memberInformationService.getMember(filter);
        if (!member) {
            throw new Error('Member not found');
        }
        return member;
    } catch (error) {
        throw new Error(error);
    }
};

exports.getMemberWithStat = async (filter) => {
    try {
        // First, try to get members with STAT as 'R'
        const membersWithR = await memberInformationService.getMember({
            ...filter,
            STAT: 'R'
        });

        // If no members with STAT 'R', get the latest member with STAT 'O'
        let members;
        if (membersWithR && membersWithR.length > 0) {
            members = membersWithR;
        } else {
            members = await memberInformationService.getMember({
                ...filter,
                STAT: {
                    [Op.or]: ['O', null, ''] // Checking for 'O', null, or empty string
                }
            }, {
                order: [['EntryDT', 'DESC']], // Ordering by Entry Date to get the latest one
                limit: 1 // Ensuring only the latest one is retrieved
            });
        }

        return members;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateMember = async (EntryNo, memberData, transaction) => {
    try {
        const branch = await branchService.getBranchById(memberData.Mem_Branch);
        if (!branch) {
            return { error: 'Branch not found! Provide valid Branch' };
        }
        const memberShipType = await memberShipTypeService.getMembershipTypeById(memberData.MemberShipType);
        if (!memberShipType) {
            return { error: 'memberShipType not found! Provide valid memberShipType' };
        }
        const memberShipStatus = await memberStatusService.getStatusById(memberData.MemberShipStatus);
        if (!memberShipStatus) {
            return { error: 'MemberShipStatus not found! Provide valid MemberShipStatus' };
        }

        const deptSrNo = await departmentService.findById(memberData.DeptSrNo);
        if (!deptSrNo) {
            return { error: 'DeptSrNo not found! Provide valid DeptSrNo' };
        }
        const depo_No = await depoService.getDepoById(memberData.Depo_No);
        if (!depo_No) {
            return { error: 'Depo_No not found! Provide valid Depo_No' };
        }
        if (!['1', '2', '3'].includes(memberData.Mem_Gender)) {
            return ({ error: 'Invalid gender in personalInfo. Please select from 1, 2, or 3' });
        }


        const updatedMember = await memberInformationService.updateMember(EntryNo, memberData, transaction);
        return updatedMember;
    } catch (error) {
        throw new Error(error);
    }
};

// ______________________________________________________________________________________________________________________________________________

exports.personalInfoGet = async (EntryNo) => {
    try {
        const member = await memberInformationService.personalInfoGet(EntryNo);
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        return member;
    } catch (error) {
        throw new Error(error);
    }
};

exports.deleteMember = async (EntryNo, transaction) => {
    try {
        const member = await memberInformationService.basicDetailsGet(EntryNo);
        if (!member) {
            throw new Error('Member not found');
        }
        const deleted = await memberInformationService.deleteMember(EntryNo, transaction);
        return deleted;
    } catch (error) {
        throw new Error(`Failed to delete Member details: ${error.message}`);
    }
};

exports.personalInfoUpdate = async (memberData, transaction) => {
    try {
        const updatedMember = await memberInformationService.updateMember(memberData.EntryNo, memberData, transaction);
        return updatedMember;
    } catch (error) {
        console.log(error);
        return null;
    }
};

exports.getMemberById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const member = await memberInformationService.getMemberById(id);
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        res.status(200).json({ message: 'Member fetched successfully', data: member });
    } catch (error) {
        next(error);
    }
};

exports.getAllMembers = async (req, res, next) => {
    try {
        const { EntryNo, MemCode, Mem_Name, mem_SrNo, SHFOLIO, STAT } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // Create a filter object
        const filters = {};
        if (EntryNo) filters.EntryNo = EntryNo;
        if (MemCode) filters.MemCode = MemCode;
        if (Mem_Name) filters.Mem_Name = { [Op.like]: `%${Mem_Name}%` };
        if (mem_SrNo) filters.mem_SrNo = mem_SrNo;
        if (SHFOLIO) filters.SHFOLIO = SHFOLIO;
        if (STAT) filters.STAT = STAT;

        // Pass filters to the service layer
        const result = await memberInformationService.getAllMembers(filters, offset, limit);

        res.status(200).json({
            message: 'Members fetched successfully',
            currentPage: page,
            totalItems: result.count,
            totalPages: Math.ceil(result.count / limit),
            data: result.rows
        });
    } catch (error) {
        next(error);
    }
};


// exports.updateMember = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const memberData = req.body;
//         const updatedMember = await memberInformationService.updateMember(id, memberData);
//         if (!updatedMember) {
//             return res.status(404).json({ message: 'Member not found' });
//         }
//         res.status(200).json({ message: 'Member updated successfully', data: updatedMember });
//     } catch (error) {
//         next(error);
//     }
// };


