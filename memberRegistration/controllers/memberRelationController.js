const memberRelationService = require('../services/memberRelationService');

exports.createRelation = async (req, res, next) => {
    try {
        const newRelation = await memberRelationService.create(req.body);
        res.status(201).json({ success: true, message: "Member relation created successfully", result: newRelation });
    } catch (error) {
        next(error);
    }
};

exports.getRelationById = async (req, res, next) => {
    try {
        const relation = await memberRelationService.getById(req.params.SrNo);
        res.status(200).json({ success: true, message: "Fetched successfully", result: relation });
    } catch (error) {
        next(error);
    }
};

exports.getAllRelations = async (req, res, next) => {
    try {
        const relations = await memberRelationService.getAll(req.query);
        res.status(200).json({ success: true, message: "Fetched successfully", result: relations });
    } catch (error) {
        next(error);
    }
};

exports.updateRelation = async (req, res, next) => {
    try {
        const updatedRelation = await memberRelationService.update(req.params.SrNo, req.body);
        res.status(200).json({ success: true, message: "Member relation updated successfully", result: updatedRelation });
    } catch (error) {
        next(error);
    }
};

exports.deleteRelation = async (req, res, next) => {
    try {
        await memberRelationService.delete(req.params.SrNo);
        res.status(200).json({ success: true, message: "Member relation deleted successfully" });
    } catch (error) {
        next(error);
    }
};
