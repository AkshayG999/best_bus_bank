const { where } = require('sequelize');
const { branchModel, memberInformationModel, memberShipTypeModel, departmentModel, depoModel, memberStatusModel, genderModel } = require('../../db/db');


exports.createMember = async (data, transaction) => {
    try {
        const newMember = await memberInformationModel.create(data, { transaction });
        return newMember;
    } catch (error) {
        throw new Error(error);
    }
};

exports.basicDetailsGet = async (id) => {
    try {
        const member = await memberInformationModel.findByPk(id, {
            attributes: ['EntryNo', 'mem_SrNo', 'EntryDT', 'Mem_Branch', 'MemCode', 'SHFOLIO', 'Mem_Name', 'MPayNo', 'SPayNo', 'MemberShipType', 'MemberShipStatus', 'DeptSrNo', 'Depo_No', 'REMARK', 'STAT'],
            include: [
                {
                    model: branchModel, as: 'branch',
                    // attributes: ["Branch_Tr", "Branch_TrDt", "Branch_Code", "Branch_Name", "PettyCash_SrNo",]
                },
                {
                    model: departmentModel, as: 'department',
                },
                {
                    model: depoModel, as: 'depo',
                },
                {
                    model: memberShipTypeModel, as: 'member_ship_type',
                },
                {
                    model: memberStatusModel, as: 'member_status',
                },
                {
                    model: genderModel, as: 'gender',
                },
            ]
        },);
        return member;
    } catch (error) {
        throw new Error(error);
    }
};

exports.personalInfoGet = async (id) => {
    try {
        const member = await memberInformationModel.findByPk(id, {
            attributes: ['EntryNo', 'mem_SrNo', 'Mem_Name', 'DOB', 'DOJBest', 'DojSoc', 'DOR', 'Mem_Gender', 'Mem_Married', 'Mem_MobileNo', 'Mem_EMailId', 'TelPhNo'],
            include: [
                {
                    model: branchModel, as: 'branch',
                    // attributes: ["Branch_Tr", "Branch_TrDt", "Branch_Code", "Branch_Name", "PettyCash_SrNo",]
                },
                {
                    model: departmentModel, as: 'department',
                },
                {
                    model: depoModel, as: 'depo',
                },
                {
                    model: memberShipTypeModel, as: 'member_ship_type',
                },
                {
                    model: memberStatusModel, as: 'member_status',
                },
                {
                    model: genderModel, as: 'gender',
                },
            ]
        });
        return member;
    } catch (error) {
        throw new Error(error);
    }
};


exports.getMemberById = async (id) => {
    try {
        const member = await memberInformationModel.findByPk(id, {
            include: [
                {
                    model: branchModel, as: 'branch',
                    // attributes: ["Branch_Tr", "Branch_TrDt", "Branch_Code", "Branch_Name", "PettyCash_SrNo",]
                },
                {
                    model: departmentModel, as: 'department',
                },
                {
                    model: depoModel, as: 'depo',
                },
                {
                    model: memberShipTypeModel, as: 'member_ship_type',
                },
                {
                    model: memberStatusModel, as: 'member_status',
                },
                {
                    model: genderModel, as: 'gender',
                },
            ]
        });
        return member;
    } catch (error) {
        throw error;
    }
};


exports.getMember = async (filter = {}, options = {}) => {
    try {
        const members = await memberInformationModel.findAll({
            where: filter,
            ...options,
            include: [
                { model: branchModel, as: 'branch' },
                { model: departmentModel, as: 'department' },
                { model: depoModel, as: 'depo' },
                { model: memberShipTypeModel, as: 'member_ship_type' },
                { model: memberStatusModel, as: 'member_status' },
                { model: genderModel, as: 'gender' },
            ]
        });
        return members;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get all members
exports.getAllMembers = async (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;
        const members = await memberInformationModel.findAndCountAll({
            offset: offset,
            limit: limit,
            include: [
                {
                    model: branchModel, as: 'branch',
                    attributes: ["Branch_Tr", "Branch_TrDt", "Branch_Code", "Branch_Name", "PettyCash_SrNo",]
                },
                {
                    model: departmentModel, as: 'department',
                },
                {
                    model: depoModel, as: 'depo',
                },
                {
                    model: memberShipTypeModel, as: 'member_ship_type',
                },
                {
                    model: memberStatusModel, as: 'member_status',
                },
                {
                    model: genderModel, as: 'gender',
                },
            ]
        });
        return members;
    } catch (error) {
        throw error;
    }
};

// Update a member by ID
exports.updateMember = async (EntryNo, newData, transaction) => {
    try {
        const [updatedCount, updatedMembers] = await memberInformationModel.update(newData, {
            where: { EntryNo: EntryNo },
            returning: true
        }, { transaction });
        if (updatedCount === 0) {
            return null;
        }
        return updatedMembers[0];
    } catch (error) {
        throw error;
    }
};


exports.deleteMember = async (EntryNo, transaction) => {
    try {
        const deleted = await memberInformationModel.destroy({
            where: { EntryNo },
            transaction
        });
        return deleted;
    } catch (error) {
        throw new Error(`Failed to delete Member details: ${error.message}`);
    }
};
