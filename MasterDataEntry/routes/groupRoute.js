const express = require("express");
const router = express.Router();
const groupController = require('../controllers/groupController');
const { checkPermissionsMiddleware } = require("../../middlewareServices/permissionsMiddleware");
const { authenticateToken } = require("../../middlewareServices/authMid");




// router.get("/", authenticateToken, checkPermissionsMiddleware('18e9b14072fct849y', 'Group Creation'), groupController.getGroups);
// router.post("/", authenticateToken, checkPermissionsMiddleware('18e9b14072fct849y', 'Group Creation', true), groupController.createGroup);
// router.put("/:sr_no", authenticateToken, checkPermissionsMiddleware('18e9b14072fct849y', 'Group Creation', true), groupController.updateGroup);
// router.delete("/:sr_no", authenticateToken, checkPermissionsMiddleware('18e9b14072fct849y', 'Group Creation', true), groupController.deleteGroup);


router.post("/", groupController.createGroup);
router.get("/", groupController.getGroups);
router.put("/:Grp_SrNo", groupController.updateGroup);
router.delete("/:Grp_SrNo", groupController.deleteGroup);



module.exports = router;