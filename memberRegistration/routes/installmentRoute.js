const express = require('express');
const router = express.Router();
const memberInstallmentController = require('../controllers/installmentController');


router.post('/', memberInstallmentController.createInstallment);
router.get('/:srno', memberInstallmentController.getInstallmentById);
router.get('/', memberInstallmentController.getAllInstallments);
router.put('/:srno', memberInstallmentController.updateInstallment);
router.delete('/:srno', memberInstallmentController.deleteInstallment);

module.exports = router;
