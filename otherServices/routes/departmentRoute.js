const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const { authenticateToken } = require("../../middlewareServices/authMid");


router.post("/", authenticateToken, departmentController.createDepartment);
router.get("/", authenticateToken, departmentController.getAllDepartments);
router.get("/:DeptSrNo", authenticateToken, departmentController.getById);
router.put("/:DeptSrNo", authenticateToken, departmentController.updateDepartment);
router.delete("/:DeptSrNo", authenticateToken, departmentController.deleteDepartment);


module.exports = router;