const branchService = require('../services/branchService');


async function createBranch(req, res, next) {
    try {
        const branchData = req.body;
        const newBranch = await branchService.createBranch(branchData);
        res.status(201).json(newBranch);
    } catch (error) {
        next(error);
    }
}


async function getBranchById(req, res, next) {
    try {
        const { id } = req.params;
        const branch = await branchService.getBranchById(id);
        res.json(branch);
    } catch (error) {
        next(error);
    }
}

async function getAllBranches(req, res, next) {
    try {
        const branches = await branchService.getAllBranches();
        res.json(branches);
    } catch (error) {
        next(error);
    }
}

async function updateBranch(req, res, next) {
    try {
        const { id } = req.params;
        const branchData = req.body;
        const updatedBranch = await branchService.updateBranch(id, branchData);
        res.json(updatedBranch);
    } catch (error) {
        next(error);
    }
}

async function deleteBranch(req, res, next) {
    try {
        const { id } = req.params;
        await branchService.deleteBranch(id);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch
};
