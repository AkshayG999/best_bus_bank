const express = require("express");
const router = express.Router();
const groupController = require('../controllers/groupController');
const { checkPermissionsMiddleware } = require("../../middlewareServices/permissionsMiddleware");
const { authenticateToken } = require("../../middlewareServices/authMid");




router.get("/", authenticateToken, checkPermissionsMiddleware('18e9b14072fct849y', 'Group Creation'), groupController.getGroups);
router.post("/", authenticateToken, checkPermissionsMiddleware('18e9b14072fct849y', 'Group Creation', true), groupController.createGroup);


module.exports = router;