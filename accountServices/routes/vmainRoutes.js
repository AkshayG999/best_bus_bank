const express = require("express");
const router = express.Router();
const vmainController = require("../controller/vmainController");


router.post("/", vmainController.create);
router.get("/", vmainController.getAll);
router.get("/unapproved", vmainController.getUnapprovedRecords);
router.get("/:EntryNo", vmainController.getByEntryNo);
router.put("/:EntryNo", vmainController.update);
router.delete("/:EntryNo", vmainController.delete);


module.exports = router;