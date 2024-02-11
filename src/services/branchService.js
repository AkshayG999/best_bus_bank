const { branchModel } = require("../config/db");

async function getAllBranches() {
    return await branchModel.findAll();
}

async function getBranchById(id) {
    return await branchModel.findByPk(id);
}

async function createBranch(
    code,
    branchName,
    address,
    city,
    district,
    pincode,
    state,
    zone,
    telephones,
    status,
    bankCode,
    bankName,
    cashAccount,
    pettyCash,
    createdBy
) {
    return await branchModel.create({
        code,
        branchName,
        address,
        city,
        district,
        pincode,
        state,
        zone,
        telephones,
        status,
        bankCode,
        bankName,
        cashAccount,
        pettyCash,
        createdBy
    }
    );
}

async function updateBranch(id, branchData) {
    const branch = await getBranchById(id);
    if (!branch) {
        throw new Error("Branch not found");
    }
    await branchModel.update(branchData);
    return branch;
}

async function deleteBranch(id) {
    const branch = await getBranchById(id);
    if (!branch) {
        throw new Error("Branch not found");
    }
    await branchModel.destroy();
}

module.exports = {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch,
};
