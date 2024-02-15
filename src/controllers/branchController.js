const branchService = require('../services/branchService');


async function createBranch(req, res, next) {
    try {
        const createdBy = req.systemID;
        const {
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
            pettyCash } = req.body;

        const newBranch = await branchService.createBranch(
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
        );

        return res.status(201).json(newBranch);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ statusCode: 500, error: error });
    }
}


async function getBranchById(req, res, next) {
    try {
        const { id } = req.params;
        const branch = await branchService.getBranchById(id);
        res.json(branch);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ statusCode: 500, error: error });
    }
}

async function getAllBranches(req, res, next) {
    try {
        const branches = await branchService.getAllBranches();
        res.json(branches);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ statusCode: 500, error: error });
    }
}

async function updateBranch(req, res, next) {
    try {
        const { id } = req.params;
        const branchData = req.body;
        const updatedBranch = await branchService.updateBranch(id, branchData);
        res.json(updatedBranch);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ statusCode: 500, error: error });
    }
}

async function deleteBranch(req, res, next) {
    try {
        const { id } = req.params;
        await branchService.deleteBranch(id);
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ statusCode: 500, error: error });
    }
}

module.exports = {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch
};