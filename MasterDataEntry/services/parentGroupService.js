const { populate } = require("dotenv");
const { db, sequelize, parentGroupModel, groupModel } = require("../../db/db");



exports.createParentGroup = async (data, transaction) => {
    try {
        const newParentGroup = await parentGroupModel.create(data, { transaction });
        return newParentGroup;
    } catch (error) {
        return error
    }
};

exports.findBySrNo = async (sr_no) => {
    return await parentGroupModel.findOne({
        where: {
            sr_no: sr_no
        }
    });
};

exports.getAll = async (filter, populate = false) => {
    return await parentGroupModel.findAll({
        where: filter,
        include: populate ? [{ model: groupModel, }] : []
    });
};


exports.updateParentGroup = async (sr_no, data, transaction) => {
    try {
        const result = await parentGroupModel.update(data, {
            where: { sr_no: sr_no }, returning: true
        }, { transaction });
        
        if (result[0] == 0) {
            return null
        }
        return result[1][0]
    } catch (error) {
        return error
    }
}

exports.deleteParentGroup = async (sr_no) => {

    return await parentGroupModel.destroy({
        where: {
            sr_no: sr_no
        }
    })
}