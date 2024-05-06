const { bankModel } = require("../../db/db");



exports.createBank = async (bankData) => {
    if (bankData === null || bankData === undefined) {
        throw new Error("Invalid input for creating a bank - null or undefined");
    }
    return await bankModel.create(bankData);
}


exports.getBank = async (filter) => {
    return await bankModel.findAll({
        where: filter
    });
}

exports.getBankByTrNo = async (TrNo) => {
    return await bankModel.findByPk(TrNo);
}

exports.updateBank = async (TrNo, updateData) => {
    return await bankModel.update(updateData, { where: { TrNo } });
}

exports.deleteBank = async (TrNo) => {
    return await bankModel.destroy({ where: { TrNo } });
}
