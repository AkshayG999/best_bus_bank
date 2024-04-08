const { generateUniqueCode, createRecord } = require('../helper/helper');
const { findByGrp_srNo } = require('../services/groupService');
const ledgerService = require('../services/ledgerService');
const { generateGroupUniqueCode, createRecordWithSrNo } = require('../storeprocedures/groupStoreProcedure');


async function createLedger(req, res) {
    try {
        const { accountName, groupId, op_acc_DR_CR, op_acc_balance, ly_acc_DR_CR, ly_cl_balance, loan_deduct, loan_deduct_amount, exception_checking, exception_amount } = req.body;

        const findGroup = await findByGrp_srNo(groupId);
        console.log(findGroup)

        // if (!findGroup) {
        //     return res.status(400).send({ success: false, message: "Group Id is Incorrect" });
        // }

        // Begin a transaction with SERIALIZABLE isolation level
        transaction = await sequelize.transaction({ isolationLevel: Sequelize.Transaction.SERIALIZABLE });

        const tr_no = await generateGroupUniqueCode("ledger_tr_no", 'AC', transaction);
        console.log(tr_no);

        const code = tr_no.split("-")[1];
        console.log(code[1]);

        const sr_no = await createRecordWithSrNo('ledger_sr_no', transaction);
        console.log(sr_no);

        // return res.status(201).json({ tr_no, acc_Sr_No });

        const ledger = await ledgerService.createLedger({ sr_no, tr_no, code, accountName, groupId, op_acc_DR_CR, op_acc_balance, ly_acc_DR_CR, ly_cl_balance, loan_deduct, loan_deduct_amount, exception_checking, exception_amount });

        return res.status(201).send({ success: true, message: "Ledger created successfully", result: ledger });

    } catch (error) {
        console.error('Error creating ledger:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getLedgers(req, res) {
    try {
        const filters = req.query;

        const ledgers = await ledgerService.getLedgers();
        res.status(200).send({ success: true, message: "Fetched successfully", result: ledgers });
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
