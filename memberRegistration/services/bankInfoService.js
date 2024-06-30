const { memberBankInfoModel } = require('../../db/db'); 

exports.create = async (data) => {
    try {
        return await memberBankInfoModel.create(data);
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

exports.getById = async (EntryNo) => {
    try {
        return await memberBankInfoModel.findByPk(EntryNo);
    } catch (error) {
        throw new Error(`Failed to fetch bank info by ID: ${error.message}`);
    }
}

exports.update = async (EntryNo, data) => {
    try {
        const [updated] = await memberBankInfoModel.update(data, { where: { EntryNo } });
        if (updated) {
            return await memberBankInfoModel.findByPk(EntryNo);
        }
        throw new Error('Bank info not found or not updated');
    } catch (error) {
        throw new Error(`Failed to update bank info: ${error.message}`);
    }
}

exports.delete = async (EntryNo) => {
    try {
        const deleted = await memberBankInfoModel.destroy({ where: { EntryNo } });
        if (deleted) {
            return true;
        }
        throw new Error('Bank info not found or not deleted');
    } catch (error) {
        throw new Error(`Failed to delete bank info: ${error.message}`);
    }
}
