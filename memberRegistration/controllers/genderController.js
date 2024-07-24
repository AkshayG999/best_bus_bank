const genderService = require('../services/genderService');


exports.createGender = async (req, res, next) => {
    try {
        const newGender = await genderService.create(req.body);
        res.status(201).json({ success: true, message: "Gender created successfully", result: newGender });
    } catch (error) {
        next(error);
    }
};

exports.getGenderById = async (req, res, next) => {
    try {
        const genderRecord = await genderService.getById(req.params.SrNo);
        res.status(200).json({ success: true, message: "Fetched successfully", result: genderRecord });
    } catch (error) {
        next(error);
    }
};

exports.getAllGenders = async (req, res, next) => {
    try {
        const genders = await genderService.getAll(req.query);
        res.status(200).json({ success: true, message: "Fetched successfully", result: genders });
    } catch (error) {
        next(error);
    }
};

exports.updateGender = async (req, res, next) => {
    try {
        const updatedGender = await genderService.update(req.params.SrNo, req.body);
        res.status(200).json({ success: true, message: "Gender updated successfully", result: updatedGender });
    } catch (error) {
        next(error);
    }
};

exports.deleteGender = async (req, res, next) => {
    try {
        await genderService.delete(req.params.SrNo);
        res.status(200).json({ success: true, message: "Gender deleted successfully" });
    } catch (error) {
        next(error);
    }
};
