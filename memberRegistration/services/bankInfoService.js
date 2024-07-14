const { where } = require('sequelize');
const { memberBankInfoModel } = require('../../db/db');

exports.create = async (data, transaction) => {
    try {
        return await memberBankInfoModel.create(data, { transaction });
    } catch (error) {
        throw new Error(`Failed to create bank info: ${error.message}`);
    }
}

exports.getAll = async () => {
    try {
        return await memberBankInfoModel.findAll();
    } catch (error) {
        throw new Error(`Failed to fetch all bank info: ${error.message}`);
    }
}

exports.getByEntryNo = async (EntryNo) => {
    try {
        return await memberBankInfoModel.findOne({ where: { EntryNo } });
    } catch (error) {
        throw new Error(`Failed to fetch bank info by ID: ${error.message}`);
    }
}

exports.getById = async (EntryNo) => {
    try {
        return await memberBankInfoModel.findByPk(EntryNo);
    } catch (error) {
        throw new Error(`Failed to fetch bank info by ID: ${error.message}`);
    }
}

exports.update = async (EntryNo, bankDetails, transaction) => {
    try {
        if (!bankDetails || typeof bankDetails !== 'object') {
            throw new Error("Invalid bank details provided.");
        }

        const [rowsUpdate, updatedDataArray] = await memberBankInfoModel.update(bankDetails, {
            where: { EntryNo },
            returning: true,
            transaction
        });

        // Check if no rows were updated
        if (rowsUpdate === 0) {
            throw new Error(`No bank record found with EntryNo ${EntryNo}.`);
        }

        const updatedData = updatedDataArray[0];
        return updatedData;
    } catch (error) {
        throw new Error(`Failed to update bank info: ${error.message}`);
    }
}

exports.delete = async (EntryNo, transaction) => {
    try {
        const deleted = await memberBankInfoModel.destroy({
            where: { EntryNo },
            transaction
        });
        return deleted;
    } catch (error) {
        throw new Error(`Failed to delete bank details: ${error.message}`);
    }
}
