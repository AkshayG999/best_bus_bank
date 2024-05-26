const express = require('express');
const router = express.Router();
const branchController = require('../controllers/bankBranchController');
const { roleAuth } = require('../middleware/roleAuth');
const { authenticateToken } = require('../../middlewareServices/authMid');



router.post('/', authenticateToken, branchController.createBranch);
router.get('/', authenticateToken, branchController.getAllBranches);
router.get('/:TrNo', authenticateToken, branchController.getBranchById);
router.put('/:TrNo', authenticateToken, branchController.updateBranch);
router.delete('/:TrNo', authenticateToken, branchController.deleteBranch);

module.exports = router;
