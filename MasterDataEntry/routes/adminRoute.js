const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticateToken } = require("../../middlewareServices/authMid");



router.put("/update-role/:systemID", authenticateToken, adminController.updateUserRole);
router.put("/dept-allocation/:systemID", authenticateToken, adminController.departmentAllocation);


module.exports = router;