const { createRecord } = require("../helper/helper");
const departmentService = require("../services/departmentService");

module.exports = {
    async createDepartment(req, res) {
        try {

            const { branchCode, branchName, bankName, departmentName, departmentNameMarathi, email, contactNo, createdBy } = req.body;

            const enteryNo = await createRecord();

            const department = await departmentService.createDepartment(
                enteryNo,
                bankName,
                branchName,
                branchCode,
                departmentName,
                departmentNameMarathi,
                email,
                contactNo,
                createdBy,
            );

            return res.status(201).json(department);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllDepartments(req, res) {
        try {
            const filteredDepartments = await departmentService.getAllDepartments(req.query);
            res.json(filteredDepartments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getDepartmentById(req, res) {
        try {
            const department = await departmentService.getDepartmentById(req.params.id);
            if (!department) {
                res.status(404).json({ message: "Department not found" });
            } else {
                res.json(department);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateDepartment(req, res) {
        try {
            const updatedDepartment = await departmentService.updateDepartment(req.params.id, req.body);
            res.json(updatedDepartment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteDepartment(req, res) {
        try {
            await departmentService.deleteDepartment(req.params.id);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

};
