const express = require("express");
const router = express.Router();
const userController = require("../controllers/adminController");
const { authenticateToken } = require("../middleware/authMid");
const { roleAuth } = require("../middleware/roleAuth");


router.put("/:systemID", authenticateToken, roleAuth(['ADMIN']), userController.updateUserRole);


module.exports = router;