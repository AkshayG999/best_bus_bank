const { branchModel, userModel } = require("../config/db");

async function getAllBranches() {
    return await branchModel.findAll();
}

async function getBranchById(id) {
    return await branchModel.findByPk(id, { include: [{ model: userModel, as: 'user', attributes: ['name', 'email', 'systemID'] }] });
}

async function createBranch(
    branchNumber,
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
        branchNumber,
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
