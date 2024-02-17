const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticateToken } = require("../middleware/authMid");
const { roleAuth } = require("../middleware/roleAuth");


router.put("/update-role/:systemID", authenticateToken, roleAuth(['ADMIN']), adminController.updateUserRole);
router.put("/dept-allocation/:systemID", authenticateToken, roleAuth(['ADMIN']), adminController.departmentAllocation);


module.exports = router;