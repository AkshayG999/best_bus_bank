const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');
const { authenticateToken } = require('../middleware/authMid');
const { roleAuth } = require('../middleware/roleAuth');

// Define routes
router.get('/', branchController.getAllBranches);
router.get('/:id', branchController.getBranchById);
router.post('/', authenticateToken, roleAuth(['ADMIN']), branchController.createBranch);
router.put('/:id', branchController.updateBranch);
router.delete('/:id', branchController.deleteBranch);

module.exports = router;
