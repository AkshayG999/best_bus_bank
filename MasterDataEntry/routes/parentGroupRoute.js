const express = require("express");
const router = express.Router();
const parentGroupController = require('../controllers/parentGroupController');


router.post("/", parentGroupController.createParentGroup)
router.get("/", parentGroupController.getParentGroups)
router.put("/:sr_no", parentGroupController.updateParentGroup)
router.delete("/:sr_no", parentGroupController.deleteParentGroup)


module.exports = router