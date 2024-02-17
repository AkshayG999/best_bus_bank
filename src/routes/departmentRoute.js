const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const { authenticateToken } = require("../middleware/authMid");
const { roleAuth } = require("../middleware/roleAuth");


router.post("/", authenticateToken, roleAuth(['ADMIN']), departmentController.createDepartment);
router.get("/", authenticateToken, departmentController.getAllDepartments);
router.get("/:id", authenticateToken, departmentController.getDepartmentById);
router.put("/:id", authenticateToken, roleAuth(['ADMIN']), departmentController.updateDepartment);
router.delete("/:id", authenticateToken, departmentController.deleteDepartment);


module.exports = router;