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
            return null;
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
        const findAddress = await memberAddressService.getByEntryNo(EntryNo);

        if (!findAddress) {
            const newAddress = await this.createMemberAddress({ EntryNo, ...address }, transaction);
            return newAddress;
        }

        const updatedAddress = await memberAddressService.update(EntryNo, address, transaction);
        return updatedAddress;
    } catch (error) {
        throw new Error(error);
    }
};


exports.deleteMemberAddress = async (EntryNo, transaction) => {
    try {
        const deleted = await memberAddressService.delete(EntryNo, transaction);
        return deleted;
    } catch (error) {
        throw new Error(`Failed to delete address: ${error.message}`);
    }
};
