const branchService = require('../services/branchService');
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");
const { sequelize } = require("../../db/db");
const { Sequelize, Op } = require("sequelize");
const AuditLogRepository = require('../../auditServices/auditLogService');


module.exports = {

    async createBranch(req, res, next) {
        let transaction = await sequelize.transaction({
            isolationLevel: Sequelize.Transaction.SERIALIZABLE,
        });
        try {
            let {
                Branch_TrDt,
                Branch_Name,
                Branch_Add_01,
                Branch_City,
                Branch_District,
                Branch_Pin,
                Branch_State,
                Branch_Zone,
                Branch_Tel_01,
                BankCode,
                PettyCash_SrNo,
                BankAccSrNo,
                CashAccSrNo,
                Branch_active
            } = req.body;
            let data = {};

            if (!Branch_TrDt || Branch_TrDt == "") {
                Branch_TrDt = new Date();
            }
            data.Branch_TrDt = Branch_TrDt;

            if (!Branch_Name || Branch_Name == "") {
                return next({ status: 400, message: "Branch Name is required" });
            }
            data.Branch_Name = Branch_Name.toUpperCase();

            if (!Branch_Add_01 || Branch_Add_01 == "") {
                return next({ status: 400, message: "Branch Address is required" });
            }
            data.Branch_Add_01 = Branch_Add_01.toUpperCase();

            if (!Branch_City || Branch_City == "") {
                return next({ status: 400, message: "Branch City is required" });
            }
            data.Branch_City = Branch_City.toUpperCase();

            if (!Branch_District || Branch_District == "") {
                return next({ status: 400, message: "Branch District is required" });
            }
            data.Branch_District = Branch_District.toUpperCase();

            if (!Branch_Pin || Branch_Pin == "") {
                return next({ status: 400, message: "Branch Pin is required" });
            }
            data.Branch_Pin = Branch_Pin;

            if (!Branch_State || Branch_State == "") {
                return next({ status: 400, message: "Branch State is required" });
            }
            data.Branch_State = Branch_State.toUpperCase();

            if (!Branch_Zone || Branch_Zone == "") {
                return next({ status: 400, message: "Branch Zone is required" });
            }
            data.Branch_Zone = Branch_Zone;

            if (!Branch_Tel_01 || Branch_Tel_01 == "") {
                return next({ status: 400, message: "Branch Telephone is required" });
            }
            data.Branch_Tel_01 = Branch_Tel_01;

            // if (!BankCode || BankCode == "") {
            //     return next({ status: 400, message: "Bank Code is required" });
            // }
            data.BankCode = BankCode;

            if (!PettyCash_SrNo || PettyCash_SrNo == "") {
                return next({ status: 400, message: "Petty Cash SrNo is required" });
            }
            data.PettyCash_SrNo = PettyCash_SrNo;

            if (!BankAccSrNo || BankAccSrNo == "") {
                return next({ status: 400, message: "Bank Account SrNo is required" });
            }
            data.BankAccSrNo = BankAccSrNo;

            if (!CashAccSrNo || CashAccSrNo == "") {
                return next({ status: 400, message: "Cash Account SrNo is required" });
            }
            data.CashAccSrNo = CashAccSrNo;

            if (!Branch_active) {
                return next({ status: 400, message: "Branch active is required" });
            }
            data.Branch_active = Branch_active;

            const Branch_Tr = await procedureStoreController.createRecordWithSrNo(
                "Branch_Tr",
                transaction
            );
            data.Branch_Tr = Branch_Tr;
            data.Branch_Code = Branch_Tr;

            const newBranch = await branchService.createBranch(data, transaction);
            console.log(newBranch);
            if (!newBranch || !newBranch.Branch_Tr) {
                return next({ status: 500, message: "Error while creating branch or Branch_Tr is missing" });
            }
            const log = await AuditLogRepository.log({
                SystemID: req.systemID,
                entityName: "branch",
                entityId: newBranch.Branch_Tr,
                action: "CREATE",
                beforeAction: null,
                afterAction: newBranch,
            }, transaction);

            await transaction.commit();

            return res.status(201).send({
                success: true,
                message: "New Branch created successfully",
                result: newBranch,
            });
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            next(error);
        }
    },


    async getAllBranches(req, res, next) {
        try {
            const { Branch_Tr, Branch_Name, Branch_City } = req.query;
            let filter = {};

            if (Branch_Tr) filter.Branch_Tr = Branch_Tr;
            if (Branch_Name) filter.Branch_Name = { [Op.iLike]: `%${Branch_Name}%` };
            if (Branch_City) filter.Branch_City = { [Op.iLike]: `%${Branch_City}%` };

            const branches = await branchService.getAllBranches(filter);
            return res.status(200).send({
                success: true,
                message: "Fetched successfully",
                result: branches,
            });
        } catch (error) {
            next(error);
        }
    },


    async getBranchById(req, res, next) {
        try {
            const { Branch_Tr } = req.params;
            const branch = await branchService.getBranchById(Branch_Tr);
            if (!branch) {
                return next({ status: 404, message: 'Branch not found' });
            }
            return res.status(200).send({
                success: true,
                message: "Fetched successfully",
                result: branch,
            });
        } catch (error) {
            next(error);
        }
    },


    async updateBranch(req, res, next) {
        let transaction = await sequelize.transaction({
            isolationLevel: Sequelize.Transaction.SERIALIZABLE,
        });
        try {
            const { Branch_Tr } = req.params;
            const {
                Branch_TrDt,
                Branch_Name,
                Branch_Add_01,
                Branch_City,
                Branch_District,
                Branch_Pin,
                Branch_State,
                Branch_Zone,
                Branch_Tel_01,
                BankCode,
                PettyCash_SrNo,
                BankAccSrNo,
                CashAccSrNo } = req.body;
            let dataForUpdate = {};

            const branch = await branchService.getBranchById(Branch_Tr);
            if (!branch) {
                return next({ status: 404, message: 'Branch not found' });
            }

            if (Branch_TrDt) {
                dataForUpdate.Branch_TrDt = Branch_TrDt;
            }

            if (Branch_Name) {
                dataForUpdate.Branch_Name = Branch_Name.toUpperCase();
            }

            if (Branch_Add_01) {
                dataForUpdate.Branch_Add_01 = Branch_Add_01.toUpperCase();
            }

            if (Branch_City) {
                dataForUpdate.Branch_City = Branch_City.toUpperCase();
            }

            if (Branch_District) {
                dataForUpdate.Branch_District = Branch_District.toUpperCase();
            }

            if (Branch_Pin) {
                dataForUpdate.Branch_Pin = Branch_Pin;
            }

            if (Branch_State) {
                dataForUpdate.Branch_State = Branch_State.toUpperCase();
            }

            if (Branch_Zone) {
                dataForUpdate.Branch_Zone = Branch_Zone;
            }

            if (Branch_Tel_01) {
                dataForUpdate.Branch_Tel_01 = Branch_Tel_01;
            }

            if (BankCode) {
                dataForUpdate.BankCode = BankCode;
            }

            if (PettyCash_SrNo) {
                dataForUpdate.PettyCash_SrNo = PettyCash_SrNo;
            }

            if (BankAccSrNo) {
                dataForUpdate.BankAccSrNo = BankAccSrNo;
            }

            if (CashAccSrNo) {
                dataForUpdate.CashAccSrNo = CashAccSrNo;
            }

            const updateBranch = await branchService.updateBranch(Branch_Tr, dataForUpdate, transaction);

            if (!updateBranch) {
                return next({ status: 404, message: 'Branch not update' });
            }
            const log = await AuditLogRepository.log({
                SystemID: req.systemID,
                entityName: "branch",
                entityId: Branch_Tr,
                action: "UPDATE",
                beforeAction: branch.dataValues,
                afterAction: updateBranch[0],
            }, transaction);
            // console.log(log)

            await transaction.commit();
            return res.status(200).send({ success: true, message: "Branch updated successfully", result: updateBranch[0] });
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            next(error);
        }
    },


    async deleteBranch(req, res, next) {
        let transaction = await sequelize.transaction({
            isolationLevel: Sequelize.Transaction.SERIALIZABLE,
        });
        try {
            const { Branch_Tr } = req.params;
            const branch = await branchService.getBranchById(Branch_Tr);
            if (!branch) {
                return next({ status: 404, message: 'Branch not found' });
            }
            const deletedRowCount = await branchService.deleteBranch(Branch_Tr);
            if (deletedRowCount === 0) {
                return next({ status: 404, message: 'Branch not delete' });
            }

            const log = await AuditLogRepository.log({
                SystemID: req.systemID,
                entityName: "branch",
                entityId: Branch_Tr,
                action: "DELETE",
                beforeAction: branch.dataValues,
            }, transaction);

            await transaction.commit();
            return res.status(200).send({ success: true, message: "Branch deleted successfully" });
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            next(error);
        }
    }


};
