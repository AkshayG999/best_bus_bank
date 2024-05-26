const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");
const bankBranchService = require('../services/bankBranchService');
const bankService = require("../services/bankService");
const { sequelize } = require("../../db/db");
const { Sequelize, Op } = require("sequelize");


exports.createBranch = async (req, res, next) => {
    let transaction;
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

        transaction = await sequelize.transaction({
            isolationLevel: Sequelize.Transaction.SERIALIZABLE,
        });

        const TrNo = await procedureStoreController.createRecordWithSrNo(
            "branch_tr_no",
            transaction
        );

        if (!TrDt) {
            TrDt = new Date();
        }
        BankName = BankName.toUpperCase();

        const newBranch = await bankBranchService.create({ TrNo, TrDt, BankCode, BankName, ParentBank }, transaction);
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

        if (TrNo) filter.TrNo = TrNo;
        if (BankCode) filter.BankCode = BankCode;
        if (BankName) filter.BankName = { [Op.iLike]: `%${BankName}%` };
        if (ParentBank) filter.ParentBank = ParentBank;
        const branches = await bankBranchService.getAll(filter);
        return res.status(200).send({ success: true, message: "Fetched successfully", result: branches });
    } catch (error) {
        next(error);
    }
}

exports.updateBranch = async (req, res, next) => {
    try {
        const { TrNo } = req.params;
        let { BankCode, BankName, ParentBank } = req.body;
        let dataForUpdate = {};

        if (!TrNo) {
            return next({ status: 400, message: "TrNo is required" });
        }

        const branch = await bankBranchService.getById(TrNo);
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

        const updatedBranch = await bankBranchService.update(TrNo, branchData);
        if (!updatedBranch) {
            return next({ status: 400, message: "Bank Branch not found" });
        }
        return res.status(200).send({ success: true, message: "Bank Branch updated successfully", result: updatedBranch });
    } catch (error) {
        next(error);
    }
}

exports.deleteBranch = async (req, res, next) => {
    try {
        const { TrNo } = req.params;
        const deletedBranch = await bankBranchService.delete(TrNo);
        if (!deletedBranch) {
            return next({ status: 400, message: "Bank Branch not found" });
        }
        return res.status(200).send({ success: true, message: "Bank Branch deleted successfully" });
    } catch (error) {
        next(error);
    }
}