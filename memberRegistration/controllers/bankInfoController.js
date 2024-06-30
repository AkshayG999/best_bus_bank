const memberBankInfoService = require('../services/bankInfoService');


exports.createBankInfo = async (req, res, next) => {
    try {
        const newBankInfo = await memberBankInfoService.create(req.body);
        res.status(201).json({ success: true, message: "Bank Info created successfully", result: newBankInfo });
    } catch (error) {
        next(error);
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

exports.getBankInfoById = async (req, res, next) => {
    try {
        const { EntryNo } = req.params;
        const bankInfo = await memberBankInfoService.getById(EntryNo);
        if (!bankInfo) {
            return res.status(404).json({ success: false, message: "Bank Info not found" });
        }
        res.status(200).json({ success: true, message: "Fetched successfully", result: bankInfo });
    } catch (error) {
        next(error);
    }
}

exports.updateBankInfo = async (req, res, next) => {
    try {
        const { EntryNo } = req.params;
        const updatedBankInfo = await memberBankInfoService.update(EntryNo, req.body);
        if (!updatedBankInfo) {
            return res.status(404).json({ success: false, message: "Bank Info not found or not updated" });
        }
        res.status(200).json({ success: true, message: "Bank Info updated successfully", result: updatedBankInfo });
    } catch (error) {
        next(error);
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
