const { genderModel } = require('../../db/db');

exports.create = async (data) => {
    try {
        return await genderModel.create(data);
    } catch (error) {
        throw new Error(`Failed to create gender: ${error.message}`);
    }
};

exports.getAll = async (filter = {}) => {
    try {
        return await genderModel.findAll({ where: filter });
    } catch (error) {
        throw new Error(`Failed to fetch genders: ${error.message}`);
    }
};

exports.getById = async (SrNo) => {
    try {
        const genderRecord = await genderModel.findByPk(SrNo);
        if (!genderRecord) throw new Error(`Gender with SrNo ${SrNo} not found`);
        return genderRecord;
    } catch (error) {
        throw new Error(`Failed to fetch gender: ${error.message}`);
    }
};

exports.update = async (SrNo, updateData) => {
    try {
        const [updated] = await genderModel.update(updateData, { where: { SrNo } });
        if (updated === 0) throw new Error(`No gender found with SrNo ${SrNo}`);
        return await gender.findByPk(SrNo); // Return the updated gender
    } catch (error) {
        throw new Error(`Failed to update gender: ${error.message}`);
    }
};

exports.delete = async (SrNo) => {
    try {
        const deleted = await genderModel.destroy({ where: { SrNo } });
        if (deleted === 0) throw new Error(`No gender found with SrNo ${SrNo}`);
        return deleted;
    } catch (error) {
        throw new Error(`Failed to delete gender: ${error.message}`);
    }
};
