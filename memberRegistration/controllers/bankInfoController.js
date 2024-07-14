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
            throw new Error("Bank Info not found");
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

exports.deleteBankInfo = async (req, res, next) => {
    try {
        const { EntryNo } = req.params;
        const deleted = await memberBankInfoService.delete(EntryNo);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Bank Info not found or not deleted" });
        }
        res.status(200).json({ success: true, message: "Bank Info deleted successfully" });
    } catch (error) {
        next(error);
    }
}
