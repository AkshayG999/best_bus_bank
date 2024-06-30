const memberInstallmentService = require('../services/installmentService');
const { sequelize, Sequelize } = require('../../db/db');
const AuditLogRepository = require('../../auditServices/auditLogService');
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");


exports.createInstallment = async (req, res, next) => {
    let transaction;
    try {
        transaction = await sequelize.transaction({ isolationLevel: Sequelize.Transaction.SERIALIZABLE });
        const data = req.body;

        const srno = await procedureStoreController.createRecordWithSrNo("member_instalment_srno", transaction);

        const newInstallment = await memberInstallmentService.create({...data,srno}, transaction);

        await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "member_installment",
            entityId: newInstallment.srno,
            action: "CREATE",
            beforeAction: null,
            afterAction: newInstallment,
        }, transaction);

        await transaction.commit();

        res.status(201).json({ success: true, message: "Member installment created successfully", result: newInstallment });
    } catch (error) {
        if (transaction) await transaction.rollback();
        next(error);
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

exports.updateInstallment = async (req, res, next) => {
    let transaction;
    try {
        transaction = await sequelize.transaction({ isolationLevel: Sequelize.Transaction.SERIALIZABLE });

        const updatedInstallment = await memberInstallmentService.update(req.params.srno, req.body, transaction);

        await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "member_installment",
            entityId: req.params.srno,
            action: "UPDATE",
            beforeAction: req.body,
            afterAction: updatedInstallment,
        }, transaction);

        await transaction.commit();

        res.status(200).json({ success: true, message: "Member installment updated successfully", result: updatedInstallment });
    } catch (error) {
        if (transaction) await transaction.rollback();
        next(error);
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
