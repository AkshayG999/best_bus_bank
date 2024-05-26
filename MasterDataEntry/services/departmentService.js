const { departmentModel, userModel, branchModel } = require("../../db/db");


module.exports = {
    async create(data, transaction) {
        try {
            return await departmentModel.create(data, { transaction });
        } catch (error) {
            throw error;
        }
    },

    async getAll(filters) {
        try {
            return await departmentModel.findAll({ where: filters });
        } catch (error) {
            throw error;
        }
    },

    async findById(DeptSrNo) {
        try {
            return await departmentModel.findByPk(DeptSrNo,
                {
                    // include: [{ model: userModel, as: 'user', attributes: ['name', 'email', 'systemID'] }, { model: branchModel, as: 'branch', attributes: { exclude: ['createdAt', 'updatedAt'] } }]
                });
        }
        catch (error) {
            throw error;
        }
    },

    async update(DeptSrNo, dataForUpdate) {
        try {
            return await departmentModel.update(dataForUpdate, {
                where: { DeptSrNo }
            });
        } catch (error) {
            throw error;
        }
    },

    async delete(DeptSrNo) {
        // destroy with matching DeptSrNo
        try {
            return await departmentModel.destroy({ where: { DeptSrNo } });
        } catch (error) {
            throw error;
        }
    },

};
