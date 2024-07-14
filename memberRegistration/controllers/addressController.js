const memberAddressService = require('../services/addressService');
const { sequelize } = require('../../db/db');


exports.createMemberAddress = async (data, transaction) => {
    try {
        const newAddress = await memberAddressService.create(data, transaction);
        return newAddress
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};


exports.getMemberAddressById = async (EntryNo) => {
    try {
        const address = await memberAddressService.getByEntryNo(EntryNo);
        if (!address) {
            throw new Error("Member Address not found");
        }
        return address;
    } catch (error) {
        throw new Error(error);
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

exports.updateMemberAddress = async (EntryNo, address, transaction) => {
    try {
        const updatedAddress = await memberAddressService.update(EntryNo, address, transaction);
        return updatedAddress;
    } catch (error) {
        throw new Error(error);
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
