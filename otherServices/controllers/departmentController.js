const { createRecord } = require("../helper/helper");
const departmentService = require("../services/departmentService");
const { sequelize } = require("../../db/db");
const { Sequelize } = require("sequelize");
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");


exports.createDepartment = async (req, res, next) => {
    let transaction;
    try {
        const {
            EntryNo,
            EntryDT,
            DeptNo,
            MPayNo,
            SPayNo,
            DeptName,
            DeptName_Mar,
            Add_01,
            Add_02,
            Add_03,
            Dept_EmailID,
            Dept_ContactNo,
            Dept_ContactPerson,
            IsMainDept,
            Branch_SrNo,
            Depo_SrNo

        } = req.body;

        let data = {};
        transaction = await sequelize.transaction({
            isolationLevel: Sequelize.Transaction.SERIALIZABLE,
        });

        if (!MPayNo) return next({ status: 400, message: "MPay is Required" });
        data.MPayNo = MPayNo;

        if (!SPayNo) return next({ status: 400, message: "SPay is Required" });
        data.SPayNo = SPayNo;

        if (!DeptName) return next({ status: 400, message: "Department Name is Required" });
        data.DeptName = DeptName.toUpperCase();

        if (DeptName_Mar && !DeptName_Mar == "") {
            data.DeptName_Mar = DeptName_Mar;
        }

        if (!Depo_SrNo) return next({ status: 400, message: "Depo_SrNo is Required" });
        data.Depo_SrNo = Depo_SrNo;

        const DeptSrNo = await procedureStoreController.createRecordWithSrNo("Department_DeptSrNo", transaction);
        data.DeptSrNo = DeptSrNo;

        const department = await departmentService.create(data, transaction);
        if (!department) {
            return next({ status: 400, message: "Department creation failed" });
        }

        await transaction.commit();

        return res.status(201).send({ success: true, message: "Department created successfully", result: department });
    } catch (error) {
        console.log(error)
        if (transaction) {
            await transaction.rollback();
        }
        next(error);
    }
}

exports.getAllDepartments = async (req, res, next) => {
    try {
        const { SPayNo, MPayNo, DeptName, Depo_SrNo } = req.query;
        let filter = {};

        if (SPayNo) filter.SPayNo = SPayNo;
        if (MPayNo) filter.MPayNo = MPayNo;
        if (DeptName) filter.DeptName = { [Op.iLike]: `%${DeptName}%` };
        if (Depo_SrNo) filter.Depo_SrNo = Depo_SrNo;

        const filteredDepartments = await departmentService.getAll(filter);
        return res.status(200).send({ success: true, message: "Departments fetched successfully", result: filteredDepartments });
    } catch (error) {
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const { DeptSrNo } = req.params;
        const department = await departmentService.findById(DeptSrNo);
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
        const { DeptSrNo } = req.params;
        const { SPayNo, MPayNo, DeptName, Depo_SrNo } = req.body;
        let dataForUpdate = {};

        const department = await departmentService.findById(DeptSrNo);
        if (!department) {
            return next({ status: 404, message: "Department not found" });
        }

        if (SPayNo) dataForUpdate.SPayNo = SPayNo;
        if (MPayNo) dataForUpdate.MPayNo = MPayNo;
        if (DeptName) dataForUpdate.DeptName = DeptName.toUpperCase();
        if (Depo_SrNo) dataForUpdate.Depo_SrNo = Depo_SrNo;

        const updatedDepartment = await departmentService.updateDepartment(DeptSrNo, dataForUpdate);

        return res.status(200).send({ success: true, message: "Department updated successfully", result: updatedDepartment });

    } catch (error) {
        next(error);
    }
}

exports.deleteDepartment = async (req, res, next) => {
    try {
        const { DeptSrNo } = req.params;
        const department = await departmentService.findById(DeptSrNo);
        if (!department) {
            return next({ status: 404, message: "Department not found" });
        }
        const result = await departmentService.delete(DeptSrNo);

        return res.status(200).send({ success: true, message: "Department deleted successfully", result: result });
    } catch (error) {
        next(error);
    }
}
