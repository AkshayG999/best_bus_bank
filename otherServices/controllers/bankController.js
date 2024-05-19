const bankService = require("../services/bankService");
const { sequelize } = require("../../db/db");
const { Sequelize, Op } = require("sequelize");
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");
const { errorMid } = require("../../middlewareServices/errorMid");
const helper = require("../helper/helper");


// Create a new bank
exports.createBank = async (req, res, next) => {
    let transaction;
    try {
        const { TrDt, BankCode, BankName, Remarks } = req.body;
        let data = {};
        data.BankCode = BankCode;
        data.BankName = BankName.toUpperCase();

        console.log(new Date());
        if (!TrDt) {
            data.TrDt = new Date();
        }

        transaction = await sequelize.transaction({
            isolationLevel: Sequelize.Transaction.SERIALIZABLE,
        });

        const TrNo = await procedureStoreController.createRecordWithSrNo(
            "bank_tr_no",
            transaction
        );
        data.TrNo = TrNo;
        if (Remarks) {
            data.Remarks = Remarks;
        }
        console.log(data);

        const newBank = await bankService.createBank(data);
        await transaction.commit();

        return res.status(201).send({
            success: true,
            message: "New Bank created successfully",
            result: newBank,
        });
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        next(error);
    }
}


exports.getBank = async (req, res, next) => {
    try {
        const banks = await bankService.getBank({});

        return res.status(200).send({
            success: true,
            message: "Fetched successfully",
            result: banks,
        });
    } catch (error) {
        next(error);
    }
}


// Read a bank by TrNo
exports.getBankByTrNo = async (req, res, next) => {
    try {
        const TrNo = req.params.TrNo;
        const bank = await bankService.getBankByTrNo(TrNo);

        if (!bank) {
            // return errorMid(400, `Bank with TR No:[${TrNo}] not found`, req, res);
            return next({ status: 404, message: `Bank with TR No:[${TrNo}] not found` });
        }

        return res.status(200).send({
            success: true,
            message: "Fetched successfully",
            result: bank,
        });
    } catch (error) {
        next(error);
    }
}

// Update a bank by TrNo
exports.updateBank = async (req, res, next) => {
    try {
        const TrNo = req.params.TrNo;
        const { TrDt, BankCode, BankName, Remarks } = req.body;
        let dataForUpdate = {};

        const bank = await bankService.getBankByTrNo(TrNo);
        if (!bank) {
            // return errorMid(400, `Bank with TR No:[${TrNo}] not found`, req, res);
            return next({ status: 404, message: `Bank with TR No:[${TrNo}] not found` });
        }
        if (TrDt) {
            dataForUpdate.TrDt = TrDt;
        }
        if (BankCode) {
            const banks = await bankService.getBank({ BankCode });
            if (banks.length > 0) {
                return next({ status: 400, message: `Bank with Bank Code:[${BankCode}] already exists` });
            }

            dataForUpdate.BankCode = BankCode
        };
        if (BankName) {
            const banks = await bankService.getBank({ BankName });
            if (banks.length > 0) {
                return next({ status: 400, message: `Bank with Bank Name:[${BankName}] already exists` });
            }
            dataForUpdate.BankName = BankName.toUppercase();
        };
        if (Remarks) {
            dataForUpdate.Remarks = Remarks;
        };

        const affectedRows = await bankService.updateBank(TrNo, dataForUpdate);
        // console.log(affectedRows);

        if (affectedRows == 0) {
            return next({ status: 400, message: 'Bank not updated' });
        }
        return res.status(200).json({ success: true, message: "Bank updated successfully", result: affectedRows });

    } catch (error) {
        next(error);
    }
}

// Delete a bank by TrNo
exports.deleteBank = async (req, res, next) => {
    try {
        const TrNo = req.params.TrNo;
        const affectedRows = await bankService.deleteBank(TrNo);
        if (affectedRows > 0) {
            return res.status(200).json({ success: true, message: "Bank deleted successfully" });
        } else {
            return next({ status: 400, message: 'Bank not Deleted' });
        }
    } catch (error) {
        next(error);
    }
}
