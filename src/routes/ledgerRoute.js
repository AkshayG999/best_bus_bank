const express = require("express");
const router = express.Router();
const ledgerController = require('../controllers/ledgerController');
const { authenticateToken } = require("../../middlewareServices/authMid");
const { checkPermissionsMiddleware } = require("../../middlewareServices/permissionsMiddleware");



router.get('/', authenticateToken, checkPermissionsMiddleware('', 'Ledger Creation'), ledgerController.getLedgers)
router.post('/', authenticateToken, checkPermissionsMiddleware('', 'Ledger Creation', true), ledgerController.createLedger)


module.exports = router