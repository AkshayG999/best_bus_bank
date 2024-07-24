const memberInstallmentService = require('../services/installmentService');
const { sequelize, Sequelize } = require('../../db/db');
const AuditLogRepository = require('../../auditServices/auditLogService');
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");


exports.createInstallment = async (data, transaction) => {
    try {
        const srno = await procedureStoreController.createRecordWithSrNo("member_instalment_srno", transaction);

        const newInstallment = await memberInstallmentService.create({ ...data, srno }, transaction);

        // await AuditLogRepository.log({
        //     SystemID: req.systemID,
        //     entityName: "member_installment",
        //     entityId: newInstallment.srno,
        //     action: "CREATE",
        //     beforeAction: null,
        //     afterAction: newInstallment,
        // }, transaction);

        return newInstallment;
    } catch (error) {
        console.log("createInstallment:", error);
        throw new Error(error);
    }
};

exports.getInstallment = async (MNO) => {
    try {
        const installment = await memberInstallmentService.get(MNO);
        return installment;
    } catch (error) {
        throw new Error(error);
    }
};

exports.getInstallmentById = async (req, res, next) => {
    try {
        const installment = await memberInstallmentService.getById(req.params.srno);
        res.status(200).json({ success: true, message: "Fetched successfully", result: installment });
    } catch (error) {
        next(error);
    }
};

exports.getAllInstallments = async (req, res, next) => {
    try {
        const installments = await memberInstallmentService.getAll(req.query);
        res.status(200).json({ success: true, message: "Fetched successfully", result: installments });
    } catch (error) {
        next(error);
    }
};

exports.updateInstallment = async (MNO, installment, transaction) => {
    try {
        const updatedInstallment = await memberInstallmentService.update(MNO, installment, transaction);

        // await AuditLogRepository.log({
        //     SystemID: req.systemID,
        //     entityName: "member_installment",
        //     entityId: req.params.srno,
        //     action: "UPDATE",
        //     beforeAction: req.body,
        //     afterAction: updatedInstallment,
        // }, transaction);

        return updatedInstallment;
    } catch (error) {
        throw new Error(error);
    }
};

exports.deleteInstallment = async (MNO, transaction) => {
    try {
        const deleted = await memberInstallmentService.delete(MNO, transaction);

        // await AuditLogRepository.log({
        //     SystemID: req.systemID,
        //     entityName: "member_installment",
        //     entityId: req.params.srno,
        //     action: "DELETE",
        //     beforeAction: req.params.srno,
        //     afterAction: null,
        // }, transaction);

        return deleted;
    } catch (error) {
        throw new Error(`Failed to delete member installment: ${error.message}`);
    }
};
