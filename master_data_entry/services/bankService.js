const { bankModel } = require("../../db/db");



exports.createBank = async (bankData, transaction) => {
    try {
        if (bankData === null || bankData === undefined) {
            throw new Error("Invalid input for creating a bank - null or undefined");
        }
        return await bankModel.create(bankData, { transaction });
    } catch (err) {
        return err;
    }
}


exports.getBank = async (filter) => {
    return await bankModel.findAll({
        where: filter
    });
}

exports.getBankByTrNo = async (TrNo) => {
    return await bankModel.findByPk(TrNo);
}

exports.updateBank = async (TrNo, updateData, transaction) => {
    try {
        const result = await bankModel.update(updateData, { where: { TrNo }, returning: true }, { transaction });
        if (result[0] === 0) {
            throw new Error(`No record found with SRNo ${TrNo}.`);
        }
        return result[1];
    } catch (error) {
        return error;
    }
}

exports.deleteBank = async (TrNo) => {
    try {
        return await bankModel.destroy({ where: { TrNo } });
    } catch (error) {
        return error;
    }
}
