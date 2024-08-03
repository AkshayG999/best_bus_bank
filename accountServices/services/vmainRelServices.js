const { vmainRelModel } = require('../../db/db');



exports.create = async (data, transaction) => {
    try {
        const vmainRel = await vmainRelModel.create(data, { transaction });
        return vmainRel;
    } catch (error) {
        throw error;
    }
}

exports.findByFilter = async (filter, populate = false) => {
    try {
        const vmainRel = await vmainRelModel.findOne({
            where: filter,
        });
        return vmainRel;
    } catch (error) {
        throw error;
    }
}

exports.getAll = async (filter) => {
    try {
        return await vmainRelModel.findAll({
            where: filter,
        });
    } catch (error) {
        throw error;
    }
}


exports.update = async (EntryNo, dataForUpdate, transaction) => {
    try {
        const result = await vmainRelModel.update(dataForUpdate, { where: { EntryNo: EntryNo }, returning: true }, { transaction });
        if (result[0] === 0) {
            throw new Error(`No record found with EntryNo ${EntryNo}.`);
        }
        return result[1];

    } catch (error) {
        throw error;
    }
}

exports.delete = async (EntryNo, transaction) => {
    try {
        return await vmainRelModel.destroy({ where: { EntryNo: EntryNo } }, { transaction });
    } catch (error) {
        throw error;
    }
}

