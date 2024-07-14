const memberInformationService = require('../services/informationService');
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");
const { sequelize } = require("../../db/db");
const { Sequelize } = require("sequelize");


exports.basicDetailsCreate = async (memberData, transaction) => {
    try {
        const EntryNo = await procedureStoreController.generateGroupUniqueCode("member_information_EntryNo", "MEM", transaction);
        const mem_SrNo = await procedureStoreController.createRecordWithSrNo("member_information_mem_SrNo", transaction);
        console.log(EntryNo);
        console.log(mem_SrNo);

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
        if (!member) {
            throw new Error('Member not found');
        }
        return member;
    } catch (error) {
        throw new Error(error);
    }
};

exports.updateMember = async (EntryNo, memberData, transaction) => {
    try {
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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = await memberInformationService.getAllMembers(page, limit);

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


