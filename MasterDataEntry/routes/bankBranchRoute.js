const express = require('express');
const router = express.Router();
const branchController = require('../controllers/bankBranchController');
const { roleAuth } = require('../middleware/roleAuth');
const { authenticateToken } = require('../../middlewareServices/authMid');



router.post('/', branchController.createBranch);
router.get('/', branchController.getAllBranches);
router.get('/:TrNo', branchController.getBranchById);
router.put('/:TrNo', branchController.updateBranch);
router.delete('/:TrNo', branchController.deleteBranch);

module.exports = router;
