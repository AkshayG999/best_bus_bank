const { ledgerModel, groupModel } = require('../config/db');



async function createLedger(TRNo, code, accountName, groupID, acc_Sr_No, op_acc_DR_CR, op_acc_balance, ly_acc_DR_CR, ly_cl_balance, loan_deduct, loan_deduct_amount, exception_checking, exception_amount) {
    try {
        const ledger = await ledgerModel.create({
            TRNo: TRNo,
            code: code,
            accountName: accountName,
            groupID: groupID,
            acc_Sr_No: acc_Sr_No,
            op_acc_DR_CR: op_acc_DR_CR,
            op_acc_balance: op_acc_balance,
            ly_acc_DR_CR: ly_acc_DR_CR,
            ly_cl_balance: ly_cl_balance,
            loan_deduct: loan_deduct,
            loan_deduct_amount: loan_deduct_amount,
            exception_checking: exception_checking,
            exception_amount: exception_amount
        });
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
