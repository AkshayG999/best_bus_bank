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
    async getAllBranches(filter) {
        try {
            const branches = await branchModel.findAll({
                where: filter
            });
            return branches;
        } catch (error) {
            throw error;
        }
    },

    // Get branch by id
    async getBranchById(id) {
        try {
            const branch = await branchModel.findByPk(id);
            return branch;
        } catch (error) {
            throw error;
        }
    },

    // Update branch by id
    async updateBranch(Branch_Tr, newData) {
        try {
            const [updatedRowsCount, updatedRows] = await branchModel.update(newData, {
                where: { Branch_Tr },
                returning: true,
            });
            return { updatedRowsCount, updatedRows };
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
