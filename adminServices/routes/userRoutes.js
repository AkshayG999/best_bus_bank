const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {  authorizeUser } = require("../../middlewareServices/authMid");
const { checkPermissionsMiddleware } = require("../../middlewareServices/permissionsMiddleware");


// // Admin Routes
// router.post("/sign-up",  checkPermissionsMiddleware('18ec79c2611qtoxng', "", true), userController.signUp);
// router.get("/get-all",  checkPermissionsMiddleware('18ec79c2611qtoxng', ""), userController.getAll);
// router.put("/update/:systemID",  checkPermissionsMiddleware('18ec79c2611qtoxng', "", true), userController.updateUser);
// router.delete("/delete/:systemID",  checkPermissionsMiddleware('18ec79c2611qtoxng', "", true), userController.deleteByID);


// Admin Routes
router.post("/sign-up", userController.signUp);
router.get("/get-all", userController.getAll);
router.put("/update/:systemID", userController.updateUser);
router.delete("/delete/:systemID", userController.deleteByID);



module.exports = router;