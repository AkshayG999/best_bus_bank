const { db, sequelize, parentGroupModel } = require("../../db/db");



const createParentGroup = async (data, transaction) => {
    try {
        const newParentGroup = await parentGroupModel.create(data, { transaction });
        return newParentGroup;
    } catch (error) {
        return error
    }
};

const findById = async (id) => {
    return await parentGroupModel.findOne({
        where: {
            id: id
        }
    });
};

const getAll = async () => {
    return await parentGroupModel.findAll();
};

module.exports = { createParentGroup, findById, getAll }