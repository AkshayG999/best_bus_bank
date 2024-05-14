const branchService = require('../services/branchService');



module.exports = {

    async createBranch(req, res, next) {
        try {
            const branchData = req.body;

            const newBranch = await branchService.createBranch(branchData);
            res.status(201).json(newBranch);
        } catch (error) {
            next(error);
        }
    },


    async getAllBranches(req, res, next) {
        try {
            const branches = await branchService.getAllBranches();
            res.status(200).json(branches);
        } catch (error) {
            next(error);
        }
    },


    async getBranchById(req, res, next) {
        try {
            const { id } = req.params;
            const branch = await branchService.getBranchById(id);
            if (!branch) {
                return next({ status: 404, message: 'Branch not found' });
            } else {
                res.status(200).json(branch);
            }
        } catch (error) {
            next(error);
        }
    },


    async updateBranch(req, res, next) {
        try {
            const { id } = req.params;
            const newData = req.body;
            const result = await branchService.updateBranch(id, newData);
            if (result.updatedRowsCount === 0) {
                res.status(404).json({ message: 'Branch not found' });
            } else {
                res.status(200).json(result.updatedRows[0]);
            }
        } catch (error) {
            next(error);
        }
    },


    async deleteBranch(req, res, next) {
        try {
            const { id } = req.params;
            const deletedRowCount = await branchService.deleteBranch(id);
            if (deletedRowCount === 0) {
                res.status(404).json({ message: 'Branch not found' });
            } else {
                res.status(204).end();
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


};
