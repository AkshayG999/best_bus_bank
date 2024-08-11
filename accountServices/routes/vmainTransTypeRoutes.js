const express = require("express");
const router = express.Router();
const accountTransTypeController = require("../controller/accountTransTypeController");

router.get("/", accountTransTypeController.getAll);

module.exports = router;