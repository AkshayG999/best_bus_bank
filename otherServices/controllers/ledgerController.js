const groupService = require('../services/groupService');
const ledgerService = require('../services/ledgerService');
const { sequelize } = require("../../db/db");
const { Sequelize } = require("sequelize");
const { handleErrors, errorMid } = require('../../middlewareServices/errorMid');
const procedureStoreController = require('../../procedureStoreServices/controller/procedureStoreController');



exports.createLedger = async (req, res) => {
    let transaction;
    try {
        const { accountName, groupSrNo, op_acc_DR_CR, op_acc_balance, ly_acc_DR_CR, ly_cl_balance, loan_deduct, loan_deduct_amount, exception_checking, exception_amount } = req.body;

        const ledgers = await ledgerService.getLedgers({ accountName });
        if (ledgers.length > 0) {
            return errorMid(400, `Ledger with accountName: ${accountName} already exists`, req, res);
        }

        const findGroup = await groupService.findBySrNo(groupSrNo);
        if (!findGroup) {
            if (!findGroup)
                return errorMid(400, `Group with groupSrNo: ${groupSrNo} not found`, req, res);
        }

        if (!['DR', 'CR'].includes(op_acc_DR_CR))
            return errorMid(400, `op_acc_DR_CR: ${op_acc_DR_CR} not valid`, req, res);


        if (typeof op_acc_balance !== 'number')
            return errorMid(400, `op_acc_balance: ${op_acc_balance} not valid`, req, res);


        if (!['DR', 'CR'].includes(ly_acc_DR_CR))
            return errorMid(400, `ly_acc_DR_CR: ${ly_acc_DR_CR} not valid`, req, res);

        if (typeof ly_cl_balance !== 'number')
            return errorMid(400, `ly_cl_balance: ${ly_cl_balance} not valid`, req, res);


        if (typeof loan_deduct !== 'boolean')
            return errorMid(400, `loan_deduct: ${loan_deduct} not valid`, req, res);

        if (typeof loan_deduct_amount !== 'number')
            return errorMid(400, `loan_deduct_amount: ${loan_deduct_amount} not valid`, req, res);

        if (typeof exception_checking !== 'boolean')
            return errorMid(400, `exception_checking: ${exception_checking} not valid`, req, res);

        if (typeof exception_amount !== 'number')
            return errorMid(400, `exception_amount: ${exception_amount} not valid`, req, res);

        // Begin a transaction with SERIALIZABLE isolation level
        transaction = await sequelize.transaction({ isolationLevel: Sequelize.Transaction.SERIALIZABLE });

        const tr_no = await procedureStoreController.generateGroupUniqueCode("ledger_tr_no", 'AC', transaction);
        console.log(tr_no);

        const code = tr_no.split("-")[1];
        console.log(code[1]);

        const sr_no = await procedureStoreController.createRecordWithSrNo('ledger_sr_no', transaction);
        console.log(sr_no);

        const ledger = await ledgerService.createLedger({ sr_no, tr_no, code, accountName, groupSrNo, op_acc_DR_CR, op_acc_balance, ly_acc_DR_CR, ly_cl_balance, loan_deduct, loan_deduct_amount, exception_checking, exception_amount });

        await transaction.commit();

        return res.status(201).send({ success: true, message: "Ledger created successfully", result: ledger });

    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error('Error creating ledger:', error);
        return handleErrors(error, req, res);
    }
};


exports.getLedgers = async (req, res) => {
    try {
        const { sr_no, tr_no, accountName, groupSrNo } = req.query;
        const filter = {};

        if (sr_no) filter.sr_no = sr_no;
        if (tr_no) filter.tr_no = tr_no;
        if (accountName) filter.accountName = { [Op.iLike]: `%${accountName}%` };
        if (groupSrNo) filter.groupSrNo = groupSrNo;

        const ledgers = await ledgerService.getLedgers(filter, true);

        res.status(200).send({ success: true, message: "Fetched successfully", result: ledgers });
    } catch (error) {
        console.error('Error fetching ledgers:', error);
        return handleErrors(error, req, res);
    }
};

exports.updateLedger = async (req, res) => {
    try {
        const { sr_no } = req.params;
        const { accountName, groupSrNo, op_acc_DR_CR, op_acc_balance, ly_acc_DR_CR, ly_cl_balance, loan_deduct, loan_deduct_amount, exception_checking, exception_amount } = req.body;
        let dataForUpdate = {};

        if (accountName) {
            const ledgers = await ledgerService.getLedgers({ accountName });
            if (ledgers.length > 0)
                return errorMid(400, `Ledger with accountName: ${accountName} already exists`, req, res);
            dataForUpdate.accountName = accountName;
        }

        if (groupSrNo) {
            const findGroup = await groupService.findBySrNo(groupSrNo);
            if (!findGroup)
                return errorMid(400, `Group with groupSrNo: ${groupSrNo} not found`, req, res);
            dataForUpdate.groupSrNo = groupSrNo;
        }

        if (op_acc_DR_CR) {
            if (!['DR', 'CR'].includes(op_acc_DR_CR))
                return errorMid(400, `op_acc_DR_CR: ${op_acc_DR_CR} not valid`, req, res);

            dataForUpdate["op_acc_DR_CR "] = op_acc_DR_CR;
        }

        if (op_acc_balance) {
            if (typeof op_acc_balance !== 'number')
                return errorMid(400, `op_acc_balance: ${op_acc_balance} not valid`, req, res);

            dataForUpdate.op_acc_balance = op_acc_balance;
        }

        if (ly_acc_DR_CR) {
            if (!['DR', 'CR'].includes(ly_acc_DR_CR))
                return errorMid(400, `ly_acc_DR_CR: ${ly_acc_DR_CR} not valid`, req, res);

            dataForUpdate.ly_acc_DR_CR = ly_acc_DR_CR;
        }

        if (ly_cl_balance) {
            if (typeof ly_cl_balance !== 'number')
                return errorMid(400, `ly_cl_balance: ${ly_cl_balance} not valid`, req, res);

            dataForUpdate.ly_cl_balance = ly_cl_balance;
        }

        if (loan_deduct) {
            if (typeof loan_deduct !== 'boolean')
                return errorMid(400, `loan_deduct: ${loan_deduct} not valid`, req, res);

            dataForUpdate.loan_deduct = loan_deduct;
        }

        if (loan_deduct_amount) {
            if (typeof loan_deduct_amount !== 'number')
                return errorMid(400, `loan_deduct_amount: ${loan_deduct_amount} not valid`, req, res);

            dataForUpdate.loan_deduct_amount = loan_deduct_amount;
        }

        if (exception_checking) {
            if (typeof exception_checking !== 'boolean')
                return errorMid(400, `exception_checking: ${exception_checking} not valid`, req, res);

            dataForUpdate.exception_checking = exception_checking;
        }

        if (exception_amount) {
            if (typeof exception_amount !== 'number')
                return errorMid(400, `exception_amount: ${exception_amount} not valid`, req, res);

            dataForUpdate.exception_amount = exception_amount;
        }

        if (!dataForUpdate)
            return errorMid(400, "Please provide valid data to update", req, res);

        const updatedLedger = await ledgerService.updateLedger(sr_no, dataForUpdate);

        return res.status(200).json({ success: true, message: "Ledger updated successfully", result: updatedLedger });
    } catch (error) {
        console.error('Error updating ledger:', error);
        return handleErrors(error, req, res);
    }
};

exports.deleteLedger = async (req, res) => {
    try {
        const { sr_no } = req.params;

        const findLedger = await ledgerService.findBySrNo(sr_no);
        if (!findLedger)
            return errorMid(400, `Ledger with sr_no: ${sr_no} not found`, req, res);

        const deletedLedger = await ledgerService.deleteLedger(sr_no);

        return res.status(200).json({ success: true, message: "Ledger deleted successfully", result: deletedLedger });
    } catch (error) {
        console.error('Error deleting ledger:', error);
        return handleErrors(error, req, res);
    }
};
