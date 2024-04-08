const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');
const { roleAuth } = require('../middleware/roleAuth');
const { authenticateToken } = require('../../middlewareServices/authMid');



router.post('/', authenticateToken, branchController.createBranch);
router.get('/', authenticateToken, branchController.getAllBranches);
router.get('/:id', authenticateToken, branchController.getBranchById);
router.put('/:id', authenticateToken, branchController.updateBranch);
router.delete('/:id', authenticateToken, branchController.deleteBranch);

module.exports = router;
