const { vmainModel } = require('../../db/db');



exports.create = async (data, transaction) => {
    try {
        const vmain = await vmainModel.create(data, { transaction });
        return vmain;
    } catch (error) {
        throw error;
    }
}

exports.findByFilter = async (filter, populate = false) => {
    try {
        const vmain = await vmainModel.findOne({
            where: filter,
        });
        return vmain;
    } catch (error) {
        throw error;
    }
}

exports.getAll = async (filter) => {
    try {
        return await vmainModel.findAll({
            where: filter,
        });
    } catch (error) {
        throw error;
    }
}


exports.update = async (TransNo, dataForUpdate, transaction) => {
    try {
        const result = await vmainModel.update(dataForUpdate, { where: { TransNo: TransNo }, returning: true }, { transaction });
        if (result[0] === 0) {
            throw new Error(`No record found with TransNo ${TransNo}.`);
        }
        return result[1];
    } catch (error) {
        throw error;
    }
}

exports.delete = async (TransNo, transaction) => {
    try {
        return await vmainModel.destroy({ where: { TransNo: TransNo } }, { transaction });
    } catch (error) {
        throw error;
    }
}

