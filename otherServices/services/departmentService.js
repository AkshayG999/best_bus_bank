const { departmentModel, userModel, branchModel } = require("../../db/db");
const { Op } = require("sequelize");
const { create } = require("./individualAccountService");


module.exports = {
    async create(data) {

        return await departmentModel.create(data);
    },

    async getAll(filters) {
        return await departmentModel.findAll({  where: filters});
    },

    async findById(id) {
        return await departmentModel.findByPk(id, { include: [{ model: userModel, as: 'user', attributes: ['name', 'email', 'systemID'] }, { model: branchModel, as: 'branch', attributes: { exclude: ['createdAt', 'updatedAt'] } }] });
    },

    async update(id, departmentData) {
        const department = await departmentModel.findByPk(id);
        if (!department) throw new Error("Department not found");
        return await departmentModel.update(departmentData);
    },

    async delete(id) {
        const department = await departmentModel.findByPk(id);
        if (!department) throw new Error("Department not found");
        await departmentModel.destroy();
    },

};
