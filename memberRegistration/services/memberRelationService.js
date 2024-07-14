const { memberRelationModel } = require('../../db/db');

exports.create = async (data) => {
    try {
        return await memberRelationModel.create(data);
    } catch (error) {
        throw new Error(`Failed to create member relation: ${error.message}`);
    }
};

exports.getAll = async (filter = {}) => {
    try {
        return await memberRelationModel.findAll({ where: filter });
    } catch (error) {
        throw new Error(`Failed to fetch member relations: ${error.message}`);
    }
};

exports.getById = async (SrNo) => {
    try {
        const relation = await memberRelationModel.findByPk(SrNo);
        if (!relation) throw new Error(`Relation with SrNo ${SrNo} not found`);
        return relation;
    } catch (error) {
        throw new Error(`Failed to fetch member relation: ${error.message}`);
    }
};

exports.update = async (SrNo, updateData) => {
    try {
        const [updated] = await memberRelationModel.update(updateData, { where: { SrNo } });
        if (updated === 0) throw new Error(`No relation found with SrNo ${SrNo}`);
        return await memberRelationModel.findByPk(SrNo); // Return the updated relation
    } catch (error) {
        throw new Error(`Failed to update member relation: ${error.message}`);
    }
};

exports.delete = async (SrNo) => {
    try {
        const deleted = await memberRelationModel.destroy({ where: { SrNo } });
        if (deleted === 0) throw new Error(`No relation found with SrNo ${SrNo}`);
        return deleted;
    } catch (error) {
        throw new Error(`Failed to delete member relation: ${error.message}`);
    }
};
