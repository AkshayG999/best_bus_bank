const memberNomineeService = require('../services/nomineeService');
const { sequelize, Sequelize } = require('../../db/db');
const AuditLogRepository = require('../../auditServices/auditLogService');
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");



exports.createNominee = async (data, transaction) => {
    try {
        const EntryNo = await procedureStoreController.generateGroupUniqueCode(
            "member_nominee_EntryNo",
            "NOM",
            transaction
        );
        console.log(EntryNo);
        const newNominee = await memberNomineeService.create({ ...data, EntryNo, }, transaction);

        return newNominee;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

exports.getNomineeByMem_EntryNo = async (Mem_EntryNo) => {
    try {
        const nominee = await memberNomineeService.getByMem_EntryNo(Mem_EntryNo);
        if (!nominee) return {}
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

exports.updateNominee = async (Mem_EntryNo, MNO, nominee, transaction) => {
    try {
        const findNominee = await memberNomineeService.getByMem_EntryNo(Mem_EntryNo);

        if (!findNominee) {
            const newNominee = await this.createNominee({ "Mem_EntryNo": Mem_EntryNo, "mno": MNO, ...nominee }, transaction);
            return newNominee;
        }

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

exports.deleteNominee = async (Mem_EntryNo, transaction) => {
    try {
        const deleted = await memberNomineeService.delete(Mem_EntryNo, transaction);

        // await AuditLogRepository.log({
        //     SystemID: req.systemID,
        //     entityName: "member_nominee",
        //     entityId: req.params.EntryNo,
        //     action: "DELETE",
        //     beforeAction: req.params.EntryNo,
        //     afterAction: null,
        // }, transaction);

        return deleted;
    } catch (error) {
        throw new Error(`Failed to delete member nominee: ${error.message}`);
    }
};
