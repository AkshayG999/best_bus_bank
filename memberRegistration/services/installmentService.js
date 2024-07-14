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

exports.get = async (srno) => {
    try {
        const installment = await memberInstallmentModel.findByPk(srno);
        if (!installment) throw new Error(`Installment with srno ${srno} not found`);
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

exports.update = async (srno, updateData, transaction = null) => {
    try {
        const options = transaction ? { transaction } : {};
        const [rowsUpdate, [updatedData]] = await memberInstallmentModel.update(updateData, {
            where: { srno },
            returning: true,
            ...options
        });

        if (rowsUpdate === 0) throw new Error(`No installment found with srno ${srno}`);

        return updatedData;
    } catch (error) {
        throw new Error(`Failed to update member installment: ${error.message}`);
    }
};

exports.delete = async (srno, transaction = null) => {
    try {
        const options = transaction ? { transaction } : {};
        const deleted = await memberInstallmentModel.destroy({
            where: { srno },
            ...options
        });

        if (deleted === 0) throw new Error(`No installment found with srno ${srno}`);
        return deleted;
    } catch (error) {
        throw new Error(`Failed to delete member installment: ${error.message}`);
    }
};
