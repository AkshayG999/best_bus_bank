const express = require("express");
const router = express.Router();
const groupController = require('../controllers/groupController');
const { checkPermissionsMiddleware } = require("../../middlewareServices/permissionsMiddleware");
const { authenticateToken } = require("../../middlewareServices/authMid");




router.get("/", checkPermissionsMiddleware('18e9b14072fct849y', 'Group Creation'), groupController.getGroups);
router.post("/", checkPermissionsMiddleware('18e9b14072fct849y', 'Group Creation', true), groupController.createGroup);
router.put("/:Grp_SrNo", checkPermissionsMiddleware('18e9b14072fct849y', 'Group Creation', true), groupController.updateGroup);
router.delete("/:Grp_SrNo", checkPermissionsMiddleware('18e9b14072fct849y', 'Group Creation', true), groupController.deleteGroup);


// router.post("/", groupController.createGroup);
// router.get("/", groupController.getGroups);
// router.put("/:Grp_SrNo", groupController.updateGroup);
// router.delete("/:Grp_SrNo", groupController.deleteGroup);



module.exports = router;