const memberAddressService = require('../services/memberAddressService');



exports.create = async function (req, res, next) {
    try {
        const address = await memberAddressService.createAddress(req.body);
        res.status(201).json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all addresses
exports.getAll = async function (req, res, next) {
    try {
        const addresses = await memberAddressService.getAllAddresses();
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get an address by EntryNo
exports.getById = async function (req, res, next) {
    try {
        const { entryNo } = req.params;
        const address = await memberAddressService.getAddressById(entryNo);
        if (address) {
            res.status(200).json(address);
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update an existing address by EntryNo
exports.update = async function (req, res, next) {
    try {
        const { entryNo } = req.params;
        const address = await memberAddressService.updateAddress(entryNo, req.body);
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an address by EntryNo
exports.delete = async function (req, res, next) {
    try {
        const { entryNo } = req.params;
        await memberAddressService.deleteAddress(entryNo);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
