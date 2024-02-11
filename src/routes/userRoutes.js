const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authMid");


router.post("/sign-up", userController.signUp);
router.post("/login", userController.login);
router.get("/:systemID", authenticateToken, userController.getBySystemID);
router.get("/", userController.getAll);
router.put("/:id", userController.updateByID);
router.delete("/:id", userController.deleteByID);


module.exports = router;