const express = require("express");
const router = express.Router();
const ledgerController = require('../controllers/ledgerController');
const { authenticateToken } = require("../../middlewareServices/authMid");
const { checkPermissionsMiddleware } = require("../../middlewareServices/permissionsMiddleware");



// router.get('/', authenticateToken, checkPermissionsMiddleware('18e9b143528rg7sc6', 'Ledger Creation'), ledgerController.getLedgers)
// router.post('/', authenticateToken, checkPermissionsMiddleware('18e9b143528rg7sc6', 'Ledger Creation', true), ledgerController.createLedger)


router.post('/', ledgerController.createLedger)
router.get('/', ledgerController.getLedgers)
router.put('/:sr_no', ledgerController.updateLedger)
router.delete('/:sr_no', ledgerController.deleteLedger)



module.exports = router