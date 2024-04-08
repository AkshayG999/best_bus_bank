const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken } = require("../../middlewareServices/authMid");



router.post("/sign-up", userController.signUp);
router.post("/login", userController.login);
router.get("/:systemID", authenticateToken, userController.getBySystemID);
router.get("/", userController.getAll);
router.put("/:id", userController.updateByID);
router.delete("/:id", userController.deleteByID);


router.put("/add-role-permissions/:systemID", userController.addRolePermissionsToUser);
router.get("/get-role-permissions/:systemID", userController.fetchUserPermissions);
router.put("/update-role-permissions/:systemID", userController.updateUserPermissions);


module.exports = router;