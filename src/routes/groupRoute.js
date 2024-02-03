const express = require("express");
const router = express.Router();
const groupController = require('../controllers/groupController');
const { authenticateToken } = require("../middleware/authMid");


router.post("/", groupController.createGroup)
router.get("/", groupController.getGroups)


module.exports = router