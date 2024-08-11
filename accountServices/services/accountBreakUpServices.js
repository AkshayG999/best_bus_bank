const { accountBreakupModel } = require('../../db/db');



exports.create = async (data, transaction) => {
    try {
        const breakUp = await accountBreakupModel.create(data, { transaction });
        return breakUp;
    } catch (error) {
        throw error;
    }
}

exports.bulkCreate = async (data,transaction) => {
    try {
        const breakUp = await accountBreakupModel.bulkCreate(data,{
            validate: true,
            returning: true,
            transaction: transaction,
        });
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


exports.update = async (filter, dataForUpdate, transaction) => {
    try {
        const result = await accountBreakupModel.update(dataForUpdate, { where: filter, returning: true,transaction: transaction });
        if (result[0] === 0) {
            throw new Error(`No record found with TransNo ${filter.TransNo}.`);
        }
        return result[1];
    } catch (error) {
        throw error;
    }
}

exports.delete = async (filter, transaction) => {
    try {
        return await accountBreakupModel.destroy({ where: filter,transaction: transaction });
    } catch (error) {
        throw error;
    }
}

