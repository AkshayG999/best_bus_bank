const { accountBreakupModel } = require('../../db/db');



exports.create = async (data, transaction) => {
    try {
        const breakUp = await accountBreakupModel.create(data, { transaction });
        return breakUp;
    } catch (error) {
        throw error;
    }
}

exports.findByFilter = async (filter, populate = false) => {
    try {
        const breakUp = await accountBreakupModel.findOne({
            where: filter,
        });
        return breakUp;
    } catch (error) {
        throw error;
    }
}

exports.getAll = async (filter) => {
    try {
        return await accountBreakupModel.findAll({
            where: filter,
        });
    } catch (error) {
        throw error;
    }
}


exports.update = async (TransNo, dataForUpdate, transaction) => {
    try {
        const result = await accountBreakupModel.update(dataForUpdate, { where: { TransNo: TransNo }, returning: true }, { transaction });
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
        return await accountBreakupModel.destroy({ where: { TransNo: TransNo } }, { transaction });
    } catch (error) {
        throw error;
    }
}

