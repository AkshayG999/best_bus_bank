const { ledgerModel } = require('../config/db');



async function createLedger(ledgerData) {
    try {
        const ledger = await ledgerModel.create(ledgerData);
        return ledger;
    } catch (error) {
        throw error;
    }
}


async function getLedgers(filters) {
    try {
        // Construct options object for Sequelize query
        const options = {
            where: {}
        };

        // Add filters to the where clause based on the provided parameters
        if (filters.code) {
            options.where.code = filters.code;
        }
        if (filters.groupID) {
            options.where.groupID = filters.groupID;
        }
        // Add more filters as needed

        // Perform the query
        const ledgers = await ledgerModel.findAll(options);
        return ledgers;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    createLedger,
    getLedgers
};
