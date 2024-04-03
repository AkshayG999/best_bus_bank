const express = require("express");
const router = express.Router();
const groupController = require('../controllers/groupController');
const { authenticateToken } = require("../middleware/authMid");
const { roleAuth } = require("../middleware/roleAuth");


router.post("/", groupController.createGroup);
router.get("/", groupController.getGroups);


module.exports = router;