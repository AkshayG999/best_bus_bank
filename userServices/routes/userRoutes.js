const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken, authorizeUser } = require("../../middlewareServices/authMid");
const { checkPermissionsMiddleware } = require("../../middlewareServices/permissionsMiddleware");


// // Admin Routes
// router.post("/sign-up", authenticateToken, checkPermissionsMiddleware('18ec79c2611qtoxng', "", true), userController.signUp);
// router.get("/get-all", authenticateToken, checkPermissionsMiddleware('18ec79c2611qtoxng', ""), userController.getAll);
// router.put("/update/:systemID", authenticateToken, checkPermissionsMiddleware('18ec79c2611qtoxng', "", true), userController.updateUser);
// router.delete("/delete/:systemID", authenticateToken, checkPermissionsMiddleware('18ec79c2611qtoxng', "", true), userController.deleteByID);

// // User Routes
// router.post("/login", userController.login);
// router.get("/get-by-system-id/:systemID", authenticateToken, authorizeUser, userController.getBySystemID);
// router.patch("/update-password/:systemID", authenticateToken, authorizeUser, userController.updatePassword);

// Admin Routes
router.post("/sign-up", userController.signUp);
router.get("/get-all", userController.getAll);
router.put("/update/:systemID", userController.updateUser);
router.delete("/delete/:systemID", userController.deleteByID);



// User Routes
router.post("/login", userController.login);
router.get("/get-by-system-id/:systemID", userController.getBySystemID);
router.patch("/update-password/:systemID", userController.updatePassword);


module.exports = router;