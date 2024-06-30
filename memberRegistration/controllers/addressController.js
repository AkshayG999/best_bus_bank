const memberAddressService = require('../services/addressService');
const { sequelize } = require('../../db/db');


exports.createMemberAddress = async (req, res, next) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const data = req.body;
        
        const newAddress = await memberAddressService.create(data, transaction);
        await transaction.commit();
        return res.status(201).json({ success: true, message: "Member Address created successfully", result: newAddress });
    } catch (error) {
        if (transaction) await transaction.rollback();
        next(error);
    }
};

exports.getAllMemberAddresses = async (req, res, next) => {
    try {
        const filter = req.query;
        const addresses = await memberAddressService.getAll(filter);
        return res.status(200).json({ success: true, message: "Fetched successfully", result: addresses });
    } catch (error) {
        next(error);
    }
};

exports.getMemberAddressById = async (req, res, next) => {
    try {
        const { EntryNo } = req.params;
        const address = await memberAddressService.getById(EntryNo);
        if (!address) {
            return next({ status: 404, message: "Member Address not found" });
        }
        return res.status(200).json({ success: true, message: "Fetched successfully", result: address });
    } catch (error) {
        next(error);
    }
};

exports.updateMemberAddress = async (req, res, next) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const { EntryNo } = req.params;
        const data = req.body;
        const updatedAddress = await memberAddressService.update(EntryNo, data, transaction);
        await transaction.commit();
        return res.status(200).json({ success: true, message: "Member Address updated successfully", result: updatedAddress });
    } catch (error) {
        if (transaction) await transaction.rollback();
        next(error);
    }
};

exports.deleteMemberAddress = async (req, res, next) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const { EntryNo } = req.params;
        await memberAddressService.delete(EntryNo, transaction);
        await transaction.commit();
        return res.status(200).json({ success: true, message: "Member Address deleted successfully" });
    } catch (error) {
        if (transaction) await transaction.rollback();
        next(error);
    }
};
