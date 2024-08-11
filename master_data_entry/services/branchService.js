const { branchModel, userModel } = require("../../db/db");

module.exports = {

    async createBranch(branchData, transaction) {
        try {
            const branch = await branchModel.create(branchData, { transaction });
            return branch;
        } catch (error) {
            return error;
        }
    },

    // Get all branches
    async getAllBranches(filter, page = 1, limit = 10) {
        try {
            const offset = (page - 1) * limit;
            const branches = await branchModel.findAndCountAll({
                where: filter,
                offset: offset,
                limit: limit,
            });
            return branches;
        } catch (error) {
            throw error;
        }
    },

    // Get branch by id
    async getBranchById(Branch_Tr) {
        try {
            const branch = await branchModel.findByPk(Branch_Tr);
            return branch;
        } catch (error) {
            throw error;
        }
    },

    // Update branch by id
    async updateBranch(Branch_Tr, newData, transaction) {
        try {
            const result = await branchModel.update(newData, {
                where: { Branch_Tr },
                returning: true,
            }, { transaction });
            if (result[0] === 0) {
                throw new Error(`No record found with Branch_Tr ${Branch_Tr}.`);
            }
            return result[1];
        } catch (error) {
            throw error;
        }
    },

    // Delete branch by id
    async deleteBranch(Branch_Tr) {
        try {
            const deletedRowCount = await branchModel.destroy({ where: { Branch_Tr } });
            return deletedRowCount;
        } catch (error) {
            throw error;
        }
    }

};
