const express = require("express");
const router = express.Router();
const parentGroupController = require('../controllers/parentGroupController')


router.post("/", parentGroupController.createParentGroup)
router.get("/", parentGroupController.getAllParentGroups)


module.exports = router