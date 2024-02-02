const express = require("express");
const router = express.Router();
const ledgerController=require('../controllers/ledgerController')


router.post('/',ledgerController.createLedger)
router.get('/',ledgerController.getLedgers)

module.exports = router