const memberBankInfoService = require('../services/bankInfoService');


exports.createBankInfo = async (data, transaction) => {
    try {
        const newBankInfo = await memberBankInfoService.create(data, transaction);
        return newBankInfo;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

exports.getBankInfo = async (EntryNo) => {
    try {
        const bankInfo = await memberBankInfoService.getByEntryNo(EntryNo);
        if (!bankInfo) {
            return {};
        }
        return bankInfo;
    } catch (error) {
        throw new Error(error);
    }
}
exports.getBankInfoById = async (EntryNo) => {
    try {
        const bankInfo = await memberBankInfoService.getByEntryNo(EntryNo);
        if (!bankInfo) {
            throw new Error("Bank Info not found");
        }
        return bankInfo;
    } catch (error) {
        throw new Error(error);
    }
}

exports.getAllBankInfo = async (req, res, next) => {
    try {
        const bankInfos = await memberBankInfoService.getAll();
        res.status(200).json({ success: true, message: "Fetched successfully", result: bankInfos });
    } catch (error) {
        next(error);
    }
}

exports.updateBankInfo = async (EntryNo, bankDetails, transaction) => {
    try {
        const updatedBankInfo = await memberBankInfoService.update(EntryNo, bankDetails, transaction);
        return updatedBankInfo
    } catch (error) {
        throw new Error(error);
    }
}

exports.deleteBankInfo = async (EntryNo, transaction) => {
    try {
        return await memberBankInfoService.delete(EntryNo, transaction);

    } catch (error) {
        throw new Error(error);
    }
}
