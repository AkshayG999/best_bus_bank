const { db, sequelize, parentGroupModel } = require("../config/db");



const createParentGroup = async ({ id, name }) => {
    const newParentGroup = await parentGroupModel.create({ id, name });
    return newParentGroup;
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