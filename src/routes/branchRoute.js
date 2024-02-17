const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');
const { authenticateToken } = require('../middleware/authMid');
const { roleAuth } = require('../middleware/roleAuth');



router.post('/', authenticateToken, roleAuth(['ADMIN']), branchController.createBranch);
router.get('/', authenticateToken, branchController.getAllBranches);
router.get('/:id', authenticateToken, branchController.getBranchById);
router.put('/:id', authenticateToken, roleAuth(['ADMIN']), branchController.updateBranch);
router.delete('/:id', authenticateToken, branchController.deleteBranch);

module.exports = router;
