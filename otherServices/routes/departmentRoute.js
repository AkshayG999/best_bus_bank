const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const { authenticateToken } = require("../../middlewareServices/authMid");


router.post("/", authenticateToken, departmentController.createDepartment);
router.get("/", authenticateToken, departmentController.getAllDepartments);
router.get("/:id", authenticateToken, departmentController.getById);
router.put("/:id", authenticateToken, departmentController.updateDepartment);
router.delete("/:id", authenticateToken, departmentController.deleteDepartment);


module.exports = router;