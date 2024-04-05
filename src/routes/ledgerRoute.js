const express = require("express");
const router = express.Router();
const ledgerController = require('../controllers/ledgerController');
const { authenticateToken } = require("../middleware/authMid");
const { roleAuth } = require("../middleware/roleAuth");


router.post('/', ledgerController.createLedger)
router.get('/', ledgerController.getLedgers)


module.exports = router