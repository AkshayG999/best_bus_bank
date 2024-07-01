const { where } = require("sequelize");
const { bankBranchModel, bankModel } = require("../../db/db");

exports.create = async (data, transaction) => {
    try {
        return await bankBranchModel.create(data, { transaction });
    }
    catch (err) {
        return err;
    }
}

exports.getAll = async (filter) => {
    return await bankBranchModel.findAll({
        where: filter,
        include: [{ model: bankModel, as: 'bank' }]
    });
}

exports.getById = async (TrNo, populate = true) => {
    return await bankBranchModel.findByPk(TrNo, {
        include: populate ? [{ model: bankModel, as: 'bank' }] : []

    });
}

exports.update = async (TrNo, branchData, transaction) => {
    try {
        const result = await bankBranchModel.update(branchData, { where: { TrNo }, returning: true }, { transaction });
        if (result[0] === 0) {
            throw new Error(`No record found with SRNo ${SRNo}.`);
        }
        return result[1]; // Returning the updated records

    } catch (error) {
        return error;
    }
}

exports.delete = async (TrNo, transaction) => {
    try {
        const result = await bankBranchModel.destroy({ where: { TrNo } });
        return result;
    } catch (error) {
        return error;
    }
}
