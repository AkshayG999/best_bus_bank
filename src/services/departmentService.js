const { departmentModel, userModel, branchModel } = require("../config/db");
const { Op } = require("sequelize");


module.exports = {
    async createDepartment(enteryNo,
        bankName,
        branchName,
        branchCode,
        departmentName,
        departmentNameMarathi,
        email,
        contactNo,
        createdBy) {

        return await departmentModel.create({
            enteryNo,
            bankName,
            branchName,
            branchCode,
            departmentName,
            departmentNameMarathi,
            email,
            contactNo,
            createdBy
        });
    },

    async getAllDepartments(filters) {
        // Construct the filter options based on the provided fields
        const filterOptions = {};
        if (filters.enteryNo) {
            filterOptions.enteryNo = filters.enteryNo;
        }
        if (filters.bankName) {
            filterOptions.bankName = { [Op.like]: `%${filters.bankName}%` };
        }
        if (filters.branchName) {
            filterOptions.branchName = { [Op.like]: `%${filters.branchName}%` };
        }
        if (filters.branchCode) {
            filterOptions.branchCode = { [Op.like]: `%${filters.branchCode}%` };
        }
        if (filters.departmentName) {
            filterOptions.departmentName = { [Op.like]: `%${filters.departmentName}%` };
        }
        if (filters.departmentNameMarathi) {
            filterOptions.departmentNameMarathi = { [Op.like]: `%${filters.departmentNameMarathi}%` };
        }

        // Query departments with the constructed filter options
        return await departmentModel.findAll({
            where: filterOptions
        });
    },

    async getDepartmentById(id) {
        return await departmentModel.findByPk(id, { include: [{ model: userModel, as: 'user', attributes: ['name', 'email', 'systemID'] }, { model: branchModel, as: 'branch', attributes: { exclude: ['createdAt', 'updatedAt'] } }] });
    },

    async updateDepartment(id, departmentData) {
        const department = await departmentModel.findByPk(id);
        if (!department) throw new Error("Department not found");
        return await departmentModel.update(departmentData);
    },

    async deleteDepartment(id) {
        const department = await departmentModel.findByPk(id);
        if (!department) throw new Error("Department not found");
        await departmentModel.destroy();
    },

};
