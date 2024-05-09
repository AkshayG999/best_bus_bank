const { where } = require("sequelize");
const { bankBranchModel, bankModel } = require("../../db/db");

exports.create = async (data, transaction) => {
    return await bankBranchModel.create(data, { transaction });
}

exports.getAll = async (filter) => {
    return await bankBranchModel.findAll({
        where: filter,
        include: [{ model: bankModel, as: 'bank' }]
    });
}

exports.getById = async (TrNo) => {
    return await bankBranchModel.findByPk(TrNo, {
        include: [{ model: bankModel, as: 'bank' }]
    });
}

exports.update = async (TrNo, branchData) => {
    const branch = await bankBranchModel.findByPk(TrNo);
    if (!branch) {
        throw new Error("Branch not found");
    }
    await bankBranchModel.update(branchData);
    return branch;
}

exports.delete = async (TrNo, transaction) => {
    const branch = await bankBranchModel.findByPk(TrNo);
    if (!branch) {
        throw new Error("Branch not found");
    }
    await bankBranchModel.destroy({ transaction });
}
