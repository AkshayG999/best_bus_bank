const { ledgerModel, groupModel } = require('../config/db');



async function createLedger(data) {
    try {
        console.log(data)
        const ledger = await ledgerModel.create(data);
        return ledger;
    } catch (error) {
        throw error;
    }
}


async function getLedgers(filters) {
    try {
        // const options = {
        //     where: {}
        // };

        // if (filters.code) {
        //     options.where.code = filters.code;
        // }
        // if (filters.groupID) {
        //     options.where.groupID = filters.groupID;
        // }

        // Perform the query
        const ledgers = await ledgerModel.findAll({ include: [{ model: groupModel, as: 'group', attributes: ['TRNo', 'groupName', 'groupUnder', 'grp_srNo'] }] });
        // const ledgers = await ledgerModel.findAll();
        return ledgers;
    } catch (error) {
        throw error;
    }
}


async function updateLedger(id, ledgerData) {
    try {
        // Perform data validation here
        // Example: Check if required fields are present and have valid values

        // Update the ledger entry
        await ledgerModel.update(ledgerData, { where: { id } });
        const updatedLedger = await Ledger.findByPk(id);
        return updatedLedger;
    } catch (error) {
        throw error;
    }
}

async function deleteLedger(id) {
    try {
        // Delete the ledger entry
        await ledgerModel.destroy({ where: { id } });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createLedger,
    getLedgers,
    updateLedger,
    deleteLedger
};
