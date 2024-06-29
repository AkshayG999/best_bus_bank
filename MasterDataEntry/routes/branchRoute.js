const express = require('express');
const router = express.Router();
const BranchController = require('../controllers/branchController');
const { authenticateToken } = require('../../middlewareServices/authMid');



router.post('/', BranchController.createBranch);
router.get('/', BranchController.getAllBranches);
router.get('/:Branch_Tr', BranchController.getBranchById);
router.put('/:Branch_Tr', BranchController.updateBranch);
router.delete('/:Branch_Tr', BranchController.deleteBranch);

module.exports = router;
