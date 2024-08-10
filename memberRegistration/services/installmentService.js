const { where } = require('sequelize');
const { memberInstallmentModel } = require('../../db/db');


exports.create = async (data, transaction = null) => {
    try {
        const options = transaction ? { transaction } : {};
        return await memberInstallmentModel.create(data, options);
    } catch (error) {
        throw new Error(`Failed to create member installment: ${error.message}`);
    }
};

exports.getAll = async (filter = {}) => {
    try {
        return await memberInstallmentModel.findAll({ where: filter });
    } catch (error) {
        throw new Error(`Failed to fetch member installments: ${error.message}`);
    }
};

exports.get = async (MNO) => {
    try {
        const installment = await memberInstallmentModel.findOne({ where: { MNO } });
        // if (!installment) throw new Error(`Installment with MNO ${MNO} not found`);
        return installment;
    } catch (error) {
        throw new Error(`Failed to fetch member installment: ${error.message}`);
    }
};

exports.getById = async (srno) => {
    try {
        const installment = await memberInstallmentModel.findByPk(srno);
        if (!installment) throw new Error(`Installment with srno ${srno} not found`);
        return installment;
    } catch (error) {
        throw new Error(`Failed to fetch member installment: ${error.message}`);
    }
};

exports.update = async (MNO, updateData, transaction = null) => {
    try {
        const options = transaction ? { transaction } : {};
        const [rowsUpdate, [updatedData]] = await memberInstallmentModel.update(updateData, {
            where: { MNO },
            returning: true,
            ...options
        });

        if (rowsUpdate === 0) return null;

        return updatedData;
    } catch (error) {
        throw new Error(`Failed to update member installment: ${error.message}`);
    }
};

exports.delete = async (MNO, transaction) => {
    try {
        const options = transaction ? { transaction } : {};
        const deleted = await memberInstallmentModel.destroy({
            where: { MNO },
            ...options
        });

        if (deleted === 0) //throw new Error(`No installment found with MNO ${MNO}`);
            return deleted;
    } catch (error) {
        throw new Error(`Failed to delete member installment: ${error.message}`);
    }
};
