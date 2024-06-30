const express = require('express');
const router = express.Router();
const memberBankInfoController = require('../controllers/bankInfoController');

// CRUD routes
router.post('/', memberBankInfoController.createBankInfo);
router.get('/', memberBankInfoController.getAllBankInfo);
router.get('/:EntryNo', memberBankInfoController.getBankInfoById);
router.put('/:EntryNo', memberBankInfoController.updateBankInfo);
router.delete('/:EntryNo', memberBankInfoController.deleteBankInfo);

module.exports = router;
