const ledgerService = require('../services/ledgerService');



async function createLedger(req, res) {
    try {
        const ledger = await ledgerService.createLedger(req.body);
        res.status(201).json(ledger);
    } catch (error) {
        console.error('Error creating ledger:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function getLedgers(req, res) {
    try {
        const ledgers = await ledgerService.getLedgers();
        // const ledgers = await ledgerService.getLedgers({ code: 123, groupID: 456 });
        res.status(200).json(ledgers);
    } catch (error) {
        console.error('Error fetching ledgers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



module.exports = {
    createLedger,
    getLedgers
};
