const { memberInformationModel } = require('../../db/db');


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
            attributes: ['EntryNo', 'mem_SrNo', 'EntryDT', 'Mem_Branch', 'MemCode', 'SHFOLIO', 'Mem_Name', 'MPayNo', 'SPayNo', 'MemberShipType', 'MemberShipStatus', 'DeptSrNo', 'Depo_No', 'REMARK', 'STAT']
        });
        return member;
    } catch (error) {
        throw new Error(error);
    }
};

exports.personalInfoGet = async (id) => {
    try {
        const member = await memberInformationModel.findByPk(id, {
            attributes: ['EntryNo', 'mem_SrNo', 'Mem_Name', 'DOB', 'DOJBest', 'DojSoc', 'DOR', 'Mem_Gender', 'Mem_Married', 'Mem_MobileNo', 'Mem_EMailId', 'TelPhNo']
        });
        return member;
    } catch (error) {
        throw new Error(error);
    }
};


exports.getMemberById = async (id) => {
    try {
        const member = await memberInformationModel.findByPk(id);
        return member;
    } catch (error) {
        throw error;
    }
};

// Get all members
exports.getAllMembers = async (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;
        const members = await memberInformationModel.findAndCountAll({
            offset: offset,
            limit: limit
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
            throw new Error(`No member found with EntryNo ${EntryNo}.`);
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
