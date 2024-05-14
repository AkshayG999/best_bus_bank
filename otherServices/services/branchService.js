const { branchModel, userModel } = require("../../db/db");

async function createBranch(branchData) {
    try {
        const branch = await branchModel.create(branchData);
        return branch;
    } catch (error) {
        throw error;
    }
}

// Get all branches
async function getAllBranches() {
    try {
        const branches = await branchModel.findAll();
        return branches;
    } catch (error) {
        throw error;
    }
}

// Get branch by id
async function getBranchById(id) {
    try {
        const branch = await branchModel.findByPk(id);
        return branch;
    } catch (error) {
        throw error;
    }
}

// Update branch by id
async function updateBranch(id, newData) {
    try {
        const [updatedRowsCount, updatedRows] = await branchModel.update(newData, {
            where: { id },
            returning: true,
        });
        return { updatedRowsCount, updatedRows };
    } catch (error) {
        throw error;
    }
}

// Delete branch by id
async function deleteBranch(id) {
    try {
        const deletedRowCount = await branchModel.destroy({ where: { id } });
        return deletedRowCount;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createBranch,
    getAllBranches,
    getBranchById,
    updateBranch,
    deleteBranch,
};
