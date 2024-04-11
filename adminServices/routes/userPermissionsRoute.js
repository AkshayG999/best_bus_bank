const express = require("express");
const router = express.Router();

const userPermissionsController = require("../controllers/userPermissionsController");

// Admin permission Routes
router.put("/add-role-permissions/:systemID", userPermissionsController.addRolePermissionsToUser);
router.get("/get-role-permissions/:systemID", userPermissionsController.fetchUserPermissions);
router.put("/update-user-permissions/:systemID", userPermissionsController.updateUserPermissions);


module.exports = router;