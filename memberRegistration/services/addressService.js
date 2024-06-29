const { member_address } = require('../../db/db');


// Get all addresses
async function getAllAddresses() {
    return await member_address.findAll();
}

// Get an address by EntryNo
async function getAddressById(entryNo) {
    return await member_address.findByPk(entryNo);
}

// Create a new address
async function createAddress(addressData) {
    return await member_address.create(addressData);
}

// Update an existing address by EntryNo
async function updateAddress(entryNo, addressData) {
    const address = await getAddressById(entryNo);
    if (address) {
        return await address.update(addressData);
    }
    throw new Error('Address not found');
}

// Delete an address by EntryNo
async function deleteAddress(entryNo) {
    const address = await getAddressById(entryNo);
    if (address) {
        await address.destroy();
    } else {
        throw new Error('Address not found');
    }
}

module.exports = {
    getAllAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
};
