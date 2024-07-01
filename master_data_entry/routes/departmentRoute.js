const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const { authenticateToken } = require("../../middlewareServices/authMid");


router.post("/", departmentController.createDepartment);
router.get("/", departmentController.getAllDepartments);
router.get("/:DeptSrNo", departmentController.getById);
router.put("/:DeptSrNo", departmentController.updateDepartment);
router.delete("/:DeptSrNo", departmentController.deleteDepartment);


module.exports = router;