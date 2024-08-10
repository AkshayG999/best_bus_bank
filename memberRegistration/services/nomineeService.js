const { where } = require('sequelize');
const { memberNomineeModel, memberRelationModel } = require('../../db/db');

exports.create = async (data, transaction = null) => {
    try {
        const options = transaction ? { transaction } : {};
        return await memberNomineeModel.create(data, options);
    } catch (error) {
        throw new Error(`Failed to create member nominee: ${error.message}`);
    }
};

exports.getAll = async (filter = {}) => {
    try {
        return await memberNomineeModel.findAll({ where: filter, include: [{ model: memberRelationModel, as: "member_relation" }] });
    } catch (error) {
        throw new Error(`Failed to fetch member nominees: ${error.message}`);
    }
};

exports.getByMem_EntryNo = async (Mem_EntryNo) => {
    try {
        const nominee = await memberNomineeModel.findOne({ where: { Mem_EntryNo }, include: [{ model: memberRelationModel, as: "member_relation" }] });
        if (!nominee) return null;// throw new Error(`Nominee with EntryNo ${Mem_EntryNo} not found`);
        return nominee;
    } catch (error) {
        throw new Error(`Failed to fetch member nominee: ${error.message}`);
    }
};
exports.getById = async (EntryNo) => {
    try {
        const nominee = await memberNomineeModel.findByPk(EntryNo);
        if (!nominee) throw new Error(`Nominee with EntryNo ${EntryNo} not found`);
        return nominee;
    } catch (error) {
        throw new Error(`Failed to fetch member nominee: ${error.message}`);
    }
};

exports.update = async (Mem_EntryNo, updateData, transaction = null) => {
    try {
        const options = transaction ? { transaction } : {};
        const [rowsUpdate, [updatedData]] = await memberNomineeModel.update(updateData, {
            where: { Mem_EntryNo },
            returning: true,
            ...options
        });

        if (rowsUpdate === 0) throw new Error(`No nominee found with EntryNo ${Mem_EntryNo}`);

        return updatedData
    } catch (error) {
        throw new Error(`Failed to update member nominee: ${error.message}`);
    }
};

exports.delete = async (Mem_EntryNo, transaction = null) => {
    try {
        const options = transaction ? { transaction } : {};
        const deleted = await memberNomineeModel.destroy({
            where: { Mem_EntryNo },
            ...options
        });

        if (deleted === 0) //throw new Error(`No nominee found with EntryNo ${Mem_EntryNo}`);
        return deleted;
    } catch (error) {
        throw new Error(`Failed to delete member nominee: ${error.message}`);
    }
};
