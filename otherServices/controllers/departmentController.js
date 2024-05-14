const { createRecord } = require("../helper/helper");
const departmentService = require("../services/departmentService");



exports.createDepartment = async (req, res, next) => {
    try {
        const {
            EntryDate,
            SysNo,
            MPay,
            SPay,
            ParentBranch,
            DepartmentName,
            DepartmentNameMarathi,
            Address,
            EmailId,
            ContactNo,
            Contact,
            IsMainDepartment,
        } = req.body;

        const EntryNo = await createRecord();

        const department = await departmentService.createDepartment(
            EntryNo,
            EntryDate,
            SysNo,
            MPay,
            SPay,
            ParentBranch,
            DepartmentName,
            DepartmentNameMarathi,
            Address,
            EmailId,
            ContactNo,
            Contact,
            IsMainDepartment
        );

        return res.status(201).send({ success: true, message: "Department created successfully", result: department });
    } catch (error) {
        next(error);
    }
}

exports.getAllDepartments = async (req, res, next) => {
    try {
        const { EntryNo, DepartmentName, IsMainDepartment } = req.query;
        let filter = {};

        if (EntryNo) filter.EntryNo = EntryNo;
        if (DepartmentName) filter.DepartmentName = { [Op.iLike]: `%${DepartmentName}%` };
        if (IsMainDepartment) filter.IsMainDepartment = IsMainDepartment;

        const filteredDepartments = await departmentService.getAll(filter);
        return res.status(200).send({ success: true, message: "Departments fetched successfully", result: filteredDepartments });
    } catch (error) {
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const department = await departmentService.getDepartmentById(
            req.params.id
        );
        if (!department) {
            return next({ status: 404, message: "Department not found" });
        }
        return res.status(200).send({ success: true, message: "Fetched successfully", result: department });
    } catch (error) {
        next(error);
    }
}

exports.updateDepartment = async (req, res, next) => {
    try {
        const updatedDepartment = await departmentService.updateDepartment(
            req.params.id,
            req.body
        );
        res.json(updatedDepartment);
    } catch (error) {
        next(error);
    }
}

exports.deleteDepartment = async (req, res, next) => {
    try {
        await departmentService.deleteDepartment(req.params.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}
