const memberNomineeService = require('../services/nomineeService');
const { sequelize, Sequelize } = require('../../db/db');
const AuditLogRepository = require('../../auditServices/auditLogService');
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");



exports.createNominee = async (req, res, next) => {
    let transaction;
    try {
        transaction = await sequelize.transaction({ isolationLevel: Sequelize.Transaction.SERIALIZABLE });
        const data = req.body;
        const EntryNo = await procedureStoreController.generateGroupUniqueCode(
            "member_nominee_EntryNo",
            "NOM",
            transaction
        );
        console.log(EntryNo);
        const newNominee = await memberNomineeService.create({...data,EntryNo}, transaction);

        await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "member_nominee",
            entityId: newNominee.EntryNo,
            action: "CREATE",
            beforeAction: null,
            afterAction: newNominee,
        }, transaction);

        await transaction.commit();

        res.status(201).json({ success: true, message: "Member nominee created successfully", result: newNominee });
    } catch (error) {
        if (transaction) await transaction.rollback();
        next(error);
    }
};

exports.getNomineeById = async (req, res, next) => {
    try {
        const nominee = await memberNomineeService.getById(req.params.EntryNo);
        res.status(200).json({ success: true, message: "Fetched successfully", result: nominee });
    } catch (error) {
        next(error);
    }
};

exports.getAllNominees = async (req, res, next) => {
    try {
        const nominees = await memberNomineeService.getAll(req.query);
        res.status(200).json({ success: true, message: "Fetched successfully", result: nominees });
    } catch (error) {
        next(error);
    }
};

exports.updateNominee = async (req, res, next) => {
    let transaction;
    try {
        transaction = await sequelize.transaction({ isolationLevel: Sequelize.Transaction.SERIALIZABLE });

        const updatedNominee = await memberNomineeService.update(req.params.EntryNo, req.body, transaction);

        await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "member_nominee",
            entityId: req.params.EntryNo,
            action: "UPDATE",
            beforeAction: req.body,
            afterAction: updatedNominee,
        }, transaction);

        await transaction.commit();

        res.status(200).json({ success: true, message: "Member nominee updated successfully", result: updatedNominee });
    } catch (error) {
        if (transaction) await transaction.rollback();
        next(error);
    }
};

exports.deleteNominee = async (req, res, next) => {
    let transaction;
    try {
        transaction = await sequelize.transaction({ isolationLevel: Sequelize.Transaction.SERIALIZABLE });

        const deleted = await memberNomineeService.delete(req.params.EntryNo, transaction);

        await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "member_nominee",
            entityId: req.params.EntryNo,
            action: "DELETE",
            beforeAction: req.params.EntryNo,
            afterAction: null,
        }, transaction);

        await transaction.commit();

        res.status(200).json({ success: true, message: "Member nominee deleted successfully" });
    } catch (error) {
        if (transaction) await transaction.rollback();
        next(error);
    }
};
