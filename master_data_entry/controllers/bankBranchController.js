const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");
const bankBranchService = require('../services/bankBranchService');
const bankService = require("../services/bankService");
const { sequelize } = require("../../db/db");
const { Sequelize, Op } = require("sequelize");
const AuditLogRepository = require("../../auditServices/auditLogService");


exports.createBranch = async (req, res, next) => {
    let transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        let { TrDt, BankCode, BankName, ParentBank } = req.body;

        if (!BankCode) {
            return next({ status: 400, message: "Bank Code is required" });
        }

        if (!BankName) {
            return next({ status: 400, message: "Bank Name is required" });
        }

        if (!ParentBank) {
            return next({ status: 400, message: "Parent Bank is required" });
        }

        const getParentBank = await bankService.getBankByTrNo(ParentBank);
        if (!getParentBank) {
            return next({ status: 400, message: "Parent Bank not found or invalid Parent Bank" });
        }

        const TrNo = await procedureStoreController.createRecordWithSrNo(
            "branch_tr_no",
            transaction
        );

        if (!TrDt) {
            TrDt = new Date();
        }
        BankName = BankName.toUpperCase();

        const newBranch = await bankBranchService.create({ TrNo, TrDt, BankCode, BankName, ParentBank }, transaction);
        if (!newBranch.dataValues) {
            return next({ status: 400, message: "Failed to create Bank Branch" });
        }
        // console.log(newBranch)
        const log = await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "bank-branch",
            entityId: newBranch.TrNo,
            action: "CREATE",
            beforeAction: null,
            afterAction: newBranch,
        }, transaction);

        await transaction.commit();

        return res.status(201).send({ success: true, message: "Bank Branch created successfully", result: newBranch });
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        next(error);
    }
}


exports.getBranchById = async (req, res, next) => {
    try {
        const { TrNo } = req.params;
        const branch = await bankBranchService.getById(TrNo);
        if (!branch) {
            return next({ status: 400, message: "Bank Branch not found" });
        }
        return res.status(200).send({ success: true, message: "Fetched successfully", result: branch });
    } catch (error) {
        next(error);
    }
}

exports.getAllBranches = async (req, res, next) => {
    try {
        const { TrNo, BankCode, BankName, ParentBank } = req.query;
        let filter = {};
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        if (TrNo) filter.TrNo = TrNo;
        if (BankCode) filter.BankCode = BankCode;
        if (BankName) filter.BankName = { [Op.iLike]: `%${BankName}%` };
        if (ParentBank) filter.ParentBank = ParentBank;
        const branches = await bankBranchService.getAll(filter, page, limit);
        return res.status(200).send({
            success: true, message: "Fetched successfully",
            currentPage: page,
            totalItems: branches.count,
            totalPages: Math.ceil(branches.count / limit),
            result: branches.rows
        });
    } catch (error) {
        next(error);
    }
}

exports.updateBranch = async (req, res, next) => {
    let transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        const { TrNo } = req.params;
        let { BankCode, BankName, ParentBank } = req.body;
        let dataForUpdate = {};

        if (!TrNo) {
            return next({ status: 400, message: "TrNo is required" });
        }

        const branch = await bankBranchService.getById(TrNo, false);
        if (!branch) {
            return next({ status: 400, message: "Bank Branch not found" });
        }

        if (BankCode) {
            dataForUpdate.BankCode = BankCode;
        }

        if (BankName) {
            BankName = BankName.toUpperCase();
            const branches = await bankBranchService.getAll({ BankName });
            if (branches && branches.length > 0) {
                return next({ status: 400, message: `Bank Branch Name With [${BankName}] already exist` });
            }
            dataForUpdate.BankName = BankName;
        }

        if (ParentBank) {
            const getParentBank = await bankService.getBankByTrNo(ParentBank);
            if (!getParentBank) {
                return next({ status: 400, message: "Parent Bank not found or invalid Parent Bank" });
            }
            dataForUpdate.ParentBank = ParentBank;
        }

        const updatedBranch = await bankBranchService.update(TrNo, dataForUpdate, transaction);
        if (!updatedBranch) {
            return next({ status: 400, message: "Bank Branch not found" });
        }
        const log = await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "bank-branch",
            entityId: TrNo,
            action: "UPDATE",
            beforeAction: branch.dataValues,
            afterAction: updatedBranch[0],
        }, transaction);
        // console.log(log)

        await transaction.commit();
        return res.status(200).send({ success: true, message: "Bank Branch updated successfully", result: updatedBranch });
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        next(error);
    }
}

exports.deleteBranch = async (req, res, next) => {
    let transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        const { TrNo } = req.params;

        const branch = await bankBranchService.getById(TrNo, false);
        if (!branch) {
            return next({ status: 400, message: "Bank Branch not found" });
        }
        const deletedBranch = await bankBranchService.delete(TrNo);
        if (!deletedBranch) {
            return next({ status: 400, message: "Error in Bank Branch delete" });
        }
        const log = await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "bank-branch",
            entityId: TrNo,
            action: "DELETE",
            beforeAction: branch.dataValues,
            afterAction: null,
        }, transaction);

        await transaction.commit();
        return res.status(200).send({ success: true, message: "Bank Branch deleted successfully" });
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        next(error);
    }
}