const express = require("express");
const router = express.Router();
const bankController = require("../controllers/bankController");
const { authenticateToken } = require("../../middlewareServices/authMid");



router.post("/", bankController.createBank);
router.get("/:TrNo", bankController.getBankByTrNo);
router.get("/", bankController.getBank);
router.put("/:TrNo", bankController.updateBank);
router.delete("/:TrNo", bankController.deleteBank);



module.exports = router