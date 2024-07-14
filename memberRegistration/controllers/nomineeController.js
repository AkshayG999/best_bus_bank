const memberNomineeService = require('../services/nomineeService');
const { sequelize, Sequelize } = require('../../db/db');
const AuditLogRepository = require('../../auditServices/auditLogService');
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");



exports.createNominee = async (Mem_EntryNo, data, transaction) => {
    try {
        const EntryNo = await procedureStoreController.generateGroupUniqueCode(
            "member_nominee_EntryNo",
            "NOM",
            transaction
        );
        console.log(EntryNo);
        const newNominee = await memberNomineeService.create({ ...data, EntryNo, Mem_EntryNo }, transaction);

        return newNominee;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

exports.getNomineeByMem_EntryNo = async (Mem_EntryNo) => {
    try {
        const nominee = await memberNomineeService.getByMem_EntryNo(Mem_EntryNo);
        return nominee;
    } catch (error) {
        throw new Error(error);
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

exports.updateNominee = async (Mem_EntryNo, nominee, transaction) => {
    try {
        const updatedNominee = await memberNomineeService.update(Mem_EntryNo, nominee, transaction);

        // await AuditLogRepository.log({
        //     SystemID: req.systemID,
        //     entityName: "member_nominee",
        //     entityId: req.params.EntryNo,
        //     action: "UPDATE",
        //     beforeAction: req.body,
        //     afterAction: updatedNominee,
        // }, transaction);

        return updatedNominee;
    } catch (error) {
        throw new Error(error);
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
