const memberDocumentService = require('../services/documentService');
const { sequelize } = require('../../db/db');
const { Sequelize, Op } = require("sequelize");
const AuditLogRepository = require('../../auditServices/auditLogService');


exports.createDocument = async (data, transaction) => {
    try {
        const newDocument = await memberDocumentService.create(data, transaction);

        // await AuditLogRepository.log({
        //     SystemID: req.systemID,
        //     entityName: "member_document",
        //     entityId: newDocument.EntryNo,
        //     action: "CREATE",
        //     beforeAction: null,
        //     afterAction: newDocument,
        // }, transaction);

        return newDocument;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

exports.getAllDocuments = async (req, res, next) => {
    try {
        const { Pancard, Adharcard, OfficeId, VoterID, Driving } = req.query; // Add other filters as needed
        let filter = {};

        if (Pancard) filter.Pancard = { [Op.iLike]: `%${Pancard}%` };
        if (Adharcard) filter.Adharcard = { [Op.iLike]: `%${Adharcard}%` };
        if (OfficeId) filter.OfficeId = { [Op.iLike]: `%${OfficeId}%` };
        if (VoterID) filter.VoterID = { [Op.iLike]: `%${VoterID}%` };
        if (Driving) filter.Driving = { [Op.iLike]: `%${Driving}%` };

        const documents = await memberDocumentService.getAll(filter);
        res.status(200).json({ success: true, message: "Fetched successfully", result: documents });
    } catch (error) {
        next(error);
    }
};

exports.getDocumentByEntryNo = async (EntryNo) => {
    try {
        const document = await memberDocumentService.getByEntryNo(EntryNo);
        if (!document) {
            return null;
        }
        return document;
    } catch (error) {
        throw new Error(error);
    }
};
exports.getDocumentById = async (req, res, next) => {
    try {
        const { EntryNo } = req.params;
        const document = await memberDocumentService.getById(EntryNo);
        if (!document) {
            return next({ status: 404, message: "Member document not found" });
        }
        res.status(200).json({ success: true, message: "Fetched successfully", result: document });
    } catch (error) {
        next(error);
    }
};

exports.updateDocument = async (EntryNo, document, transaction) => {
    try {
        const existingDocument = await memberDocumentService.getByEntryNo(EntryNo);

        if (!existingDocument) {
            const newDocument = await this.createDocument({ EntryNo, ...document }, transaction);
            return newDocument;
        }
        
        const updatedDocument = await memberDocumentService.update(EntryNo, document, transaction);

        // await AuditLogRepository.log({
        //     SystemID: req.systemID, // Assuming you have a way to get systemID
        //     entityName: "member_document",
        //     entityId: EntryNo,
        //     action: "UPDATE",
        //     beforeAction: existingDocument.dataValues,
        //     afterAction: updatedDocument.dataValues,
        // }, transaction);

        return updatedDocument;
    } catch (error) {
        throw new Error(error);
    }
};

exports.deleteDocument = async (EntryNo, transaction) => {
    try {
        const deleted = await memberDocumentService.delete(EntryNo, transaction);

        // await AuditLogRepository.log({
        //     SystemID: req.systemID,
        //     entityName: "member_document",
        //     entityId: EntryNo,
        //     action: "DELETE",
        //     beforeAction: document.dataValues,
        //     afterAction: null,
        // }, transaction);
        return deleted;
    } catch (error) {
        throw new Error(`Failed to delete document: ${error.message}`);
    }
};
