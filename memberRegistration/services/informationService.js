const { memberInformationModel } = require('../../db/db');


exports.createMember = async (data) => {
    try {
        const newMember = await memberInformationModel.create(data);
        return newMember;
    } catch (error) {
        throw error;
    }
};

exports.basicDetailsGet = async (id) => {
    try {
        const member = await memberInformationModel.findByPk(id, {
            attributes: ['mem_SrNo', 'EntryDT', 'Mem_Branch', 'MemCode', 'SHFOLIO', 'Mem_Name', 'MPayNo', 'SPayNo', 'MemberShipType', 'MemberShipStatus', 'DeptSrNo', 'Depo_No', 'REMARK', 'STAT']
        });
        return member;
    } catch (error) {
        throw error;
    }
};

exports.personalInfoGet = async (id) => {
    try {
        const member = await memberInformationModel.findByPk(id, {
            attributes: ['mem_SrNo', 'Mem_Name', 'DOB', 'DOJBest', 'DojSoc', 'DOR', 'Mem_Gender', 'Mem_Married', 'Mem_MobileNo', 'Mem_EMailId', 'TelPhNo']
        });
        return member;
    } catch (error) {
        throw error;
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
exports.updateMember = async (id, newData) => {
    try {
        const [updatedCount, updatedMembers] = await memberInformationModel.update(newData, {
            where: { mem_SrNo: id },
            returning: true
        });
        if (updatedCount === 0) {
            throw new Error(`No member found with EntryNo ${id}.`);
        }
        return updatedMembers[0];
    } catch (error) {
        throw error;
    }
};


exports.deleteMember = async (id) => {
    try {
        const deletedCount = await memberInformationModel.destroy({
            where: { EntryNo: id }
        });
        return deletedCount;
    } catch (error) {
        throw error;
    }
};
