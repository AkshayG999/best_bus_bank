const memberInstallmentService = require('../services/installmentService');
const { sequelize, Sequelize } = require('../../db/db');
const AuditLogRepository = require('../../auditServices/auditLogService');
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");


exports.createInstallment = async (EntryNo, data, transaction) => {
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

exports.getInstallment = async () => {
    try {
        const installment = await memberInstallmentService.get();
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

exports.updateInstallment = async (EntryNo, installment, transaction) => {
    try {
        const updatedInstallment = await memberInstallmentService.update(EntryNo, installment, transaction);

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

exports.deleteInstallment = async (req, res, next) => {
    let transaction;
    try {
        transaction = await sequelize.transaction({ isolationLevel: Sequelize.Transaction.SERIALIZABLE });

        const deleted = await memberInstallmentService.delete(req.params.srno, transaction);

        await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "member_installment",
            entityId: req.params.srno,
            action: "DELETE",
            beforeAction: req.params.srno,
            afterAction: null,
        }, transaction);

        await transaction.commit();

        res.status(200).json({ success: true, message: "Member installment deleted successfully" });
    } catch (error) {
        if (transaction) await transaction.rollback();
        next(error);
    }
};
