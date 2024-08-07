const bankService = require("../services/bankService");
const { sequelize } = require("../../db/db");
const { Sequelize, Op } = require("sequelize");
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");
const AuditLogRepository = require("../../auditServices/auditLogService");


// Create a new bank
exports.createBank = async (req, res, next) => {
    let transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        let { TrDt, BankCode, BankName, Remarks } = req.body;
        let data = {};
        data.BankCode = BankCode;
        data.BankName = BankName.toUpperCase();

        // console.log(new Date());
        if (!TrDt) {
            TrDt = new Date();
        }
        data.TrDt = TrDt;

        const TrNo = await procedureStoreController.createRecordWithSrNo(
            "bank_tr_no",
            transaction
        );
        data.TrNo = TrNo;

        if (Remarks) {
            data.Remarks = Remarks;
        }
        // console.log(data);

        const newBank = await bankService.createBank(data, transaction);
        console.log(newBank);
        const log = await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "bank",
            entityId: newBank.dataValues.TrNo,
            action: "CREATE",
            beforeAction: null,
            afterAction: newBank,
        }, transaction);

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
        console.log(error);
        next(error);
    }
}


exports.getBank = async (req, res, next) => {
    try {
        const { TrNo, BankCode, BankName, } = req.query;
        let filter = {};

        if (TrNo) filter.TrNo = TrNo;
        if (BankCode) filter.BankCode = BankCode;
        if (BankName) filter.BankName = { [Op.iLike]: `%${BankName}%` };

        const banks = await bankService.getBank(filter);

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
        return next(error);
    }
}

// Update a bank by TrNo
exports.updateBank = async (req, res, next) => {
    let transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        const TrNo = req.params.TrNo;
        let { TrDt, BankCode, BankName, Remarks } = req.body;
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
            BankName = BankName.toUpperCase();
            const banks = await bankService.getBank({ BankName });
            if (banks.length > 0) {
                return next({ status: 400, message: `Bank with Bank Name:[${BankName}] already exists` });
            }
            dataForUpdate.BankName = BankName;
        };
        if (Remarks) {
            dataForUpdate.Remarks = Remarks;
        };

        const affectedRows = await bankService.updateBank(TrNo, dataForUpdate, transaction);

        const log = await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "bank",
            entityId: TrNo,
            action: "UPDATE",
            beforeAction: bank.dataValues,
            afterAction: affectedRows[0],
        }, transaction);
        // console.log(log)

        await transaction.commit();

        return res.status(200).json({ success: true, message: "Bank updated successfully", result: affectedRows });

    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        next(error);
    }
}

// Delete a bank by TrNo
exports.deleteBank = async (req, res, next) => {
    let transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        const TrNo = req.params.TrNo;
        const bank = await bankService.getBankByTrNo(TrNo);
        if (!bank) {
            return next({ status: 404, message: `Bank with TR No:[${TrNo}] not found` });
        }

        const affectedRows = await bankService.deleteBank(TrNo);
        // console.log(affectedRows);

        if (affectedRows < 1) {
            return next({ status: 400, message: 'Bank not Deleted' });
        }

        const log = await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "bank",
            entityId: TrNo,
            action: "DELETE",
            beforeAction: bank.dataValues,
            afterAction: null,
        }, transaction);

        await transaction.commit();
        return res.status(200).json({ success: true, message: "Bank deleted successfully" });


    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        next(error);
    }
}