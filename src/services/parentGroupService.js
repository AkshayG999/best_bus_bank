const { db, sequelize, parentGroupModel } = require("../config/db");



const createParentgroup = async ({ id, name }) => {
    const newParentgroup = await parentGroupModel.create({ id, name });
    return newParentgroup;
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

module.exports = { createParentgroup, findById, getAll }