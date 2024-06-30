const { memberAddressModel } = require('../../db/db');

exports.create = async (data, transaction) => {
    try {
        return await memberAddressModel.create(data, { transaction });
    } catch (error) {
        throw error;
    }
};

exports.getAll = async (filter) => {
    try {
        return await memberAddressModel.findAll({ where: filter });
    } catch (error) {
        throw error;
    }
};

exports.getById = async (EntryNo) => {
    try {
        return await memberAddressModel.findByPk(EntryNo);
    } catch (error) {
        throw error;
    }
};

exports.update = async (EntryNo, data, transaction) => {
    try {
        const [rowsUpdate, [updatedAddress]] = await memberAddressModel.update(data, {
            where: { EntryNo },
            returning: true,
            transaction
        });
        if (rowsUpdate === 0) {
            throw new Error(`No record found with EntryNo ${EntryNo}.`);
        }
        return updatedAddress;
    } catch (error) {
        throw error;
    }
};

exports.delete = async (EntryNo, transaction) => {
    try {
        return await memberAddressModel.destroy({ where: { EntryNo }, transaction });
    } catch (error) {
        throw error;
    }
};
