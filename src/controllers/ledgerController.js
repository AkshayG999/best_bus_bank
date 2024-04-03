const { generateUniqueCode, createRecord } = require('../helper/helper');
const { findByGrp_srNo } = require('../services/groupService');
const ledgerService = require('../services/ledgerService');


async function createLedger(req, res) {
    try {
        const { accountName, groupID, op_acc_DR_CR, op_acc_balance, ly_acc_DR_CR, ly_cl_balance, loan_deduct, loan_deduct_amount, exception_checking, exception_amount } = req.body;
        
        const findGroup = await findByGrp_srNo(groupID);
        console.log(findGroup)

        if (!findGroup) {
            return res.status(400).send({ success: false, message: "Group Id is Incorrect" });
        }

        const TRNo = await generateUniqueCode('AC');
        console.log(TRNo);

        const code = TRNo.split("-");
        console.log(code[1]);

        const acc_Sr_No = await createRecord();
        console.log(acc_Sr_No);


        const ledger = await ledgerService.createLedger(TRNo, code[1], accountName, groupID, acc_Sr_No, op_acc_DR_CR, op_acc_balance, ly_acc_DR_CR, ly_cl_balance, loan_deduct, loan_deduct_amount, exception_checking, exception_amount);
        res.status(201).json(ledger);

    } catch (error) {
        console.error('Error creating ledger:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getLedgers(req, res) {
    try {
        const filters = req.query;

        const ledgers = await ledgerService.getLedgers();
        res.status(200).json(ledgers);
    } catch (error) {
        console.error('Error fetching ledgers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateLedger(req, res) {
    try {
        const { id } = req.params;
        const ledgerData = req.body;
        const ledger = await ledgerService.updateLedger(id, ledgerData);
        res.status(200).json(ledger);
    } catch (error) {
        console.error('Error updating ledger:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteLedger(req, res) {
    try {
        const { id } = req.params;
        await ledgerService.deleteLedger(id);
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting ledger:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    createLedger,
    getLedgers,
    updateLedger,
    deleteLedger
};
