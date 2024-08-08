const { departmentModel, userModel, branchModel } = require("../../db/db");


module.exports = {
    async create(data, transaction) {
        try {
            return await departmentModel.create(data, { transaction });
        } catch (error) {
            throw error;
        }
    },

    async getAll(filters, page = 1, limit = 10) {
        try {
            const offset = (page - 1) * limit;
            return await departmentModel.findAndCountAll({
                where: filters,
                offset: offset,
                limit: limit,
            });
        } catch (error) {
            throw error;
        }
    },

    async findById(DeptSrNo, populate = false) {
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

    async update(DeptSrNo, dataForUpdate, transaction) {
        try {
            const result = await departmentModel.update(dataForUpdate, {
                where: { DeptSrNo }, returning: true
            }, { transaction });
            if (result[0] === 0) {
                throw new Error(`No record found with Branch_Tr ${Branch_Tr}.`);
            }
            return result[1];
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
