const groupService = require("../services/groupService");
const individualAccountService = require("../services/individualAccountService");
const { sequelize } = require("../../db/db");
const { Sequelize } = require("sequelize");
const { handleErrors, errorMid } = require("../../middlewareServices/errorMid");
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");


exports.create = async (req, res) => {
    let transaction;

    try {
        let {
            AccountName,
            GroupName,
            BankSrNo,
            OpClosingRelatedTo,
            OP_Balance,
            CL_Balance,
            ACC_DRCR,
            SYSAcc,
            LY_ACC_DRCR,
            LYCL_Balance,
            LoanDeduct_YN,
            ExceptionChecking,
            ExceptionAmt,
        } = req.body;

        const individualAccounts =
            await individualAccountService.getAll({ AccountName });
        if (individualAccounts.length > 0) {
            return errorMid(
                400,
                `IndividualAccount with Account Name: [${AccountName}] already exists`,
                req,
                res
            );
        }

        const findGroup = await groupService.findBySrNo(GroupName);
        if (!findGroup) {
            if (!findGroup)
                return errorMid(
                    400,
                    `Group with Group Name: [${GroupName}] not found`,
                    req,
                    res
                );
        }

        if (!["DR", "CR"].includes(ACC_DRCR))
            return errorMid(
                400,
                `ACC_DRCR: [${ACC_DRCR}] not valid Please provide [DR, CR]`,
                req,
                res
            );

        if (typeof OP_Balance !== "number")
            return errorMid(
                400,
                `op_acc_balance: ${OP_Balance} not valid Please provide number`,
                req,
                res
            );

        if (!["DR", "CR"].includes(LY_ACC_DRCR))
            return errorMid(
                400,
                `LY_ACC_DRCR: ${LY_ACC_DRCR} not valid Please provide [DR, CR]`,
                req,
                res
            );

        if (typeof LYCL_Balance !== "number")
            return errorMid(
                400,
                `LYCL_Balance: ${LYCL_Balance} not valid Please provide number`,
                req,
                res
            );

        if (typeof LoanDeduct_YN !== "boolean")
            return errorMid(
                400,
                `LoanDeduct_YN: ${LoanDeduct_YN} not valid Please provide [true, false]`,
                req,
                res
            );

        // if (typeof loan_deduct_amount !== "number")
        //     return errorMid(
        //         400,
        //         `loan_deduct_amount: ${loan_deduct_amount} not valid Please provide number`,
        //         req,
        //         res
        //     );

        if (typeof ExceptionChecking !== "boolean")
            return errorMid(
                400,
                `Exception Checking: ${ExceptionChecking} not valid Please provide [true, false]`,
                req,
                res
            );

        if (typeof ExceptionAmt !== "number")
            return errorMid(
                400,
                `ExceptionAmt: ${ExceptionAmt} not valid Please provide number`,
                req,
                res
            );

        // Begin a transaction with SERIALIZABLE isolation level
        transaction = await sequelize.transaction({
            isolationLevel: Sequelize.Transaction.SERIALIZABLE,
        });

        const TrNo = await procedureStoreController.generateGroupUniqueCode(
            "IndividualAccount_tr_no",
            "AC",
            transaction
        );
        console.log(TrNo);

        let Code = TrNo.split("-")[1];
        console.log(Code);

        const AccSrNo = await procedureStoreController.createRecordWithSrNo(
            "IndividualAccount_sr_no",
            transaction
        );
        console.log({ AccSrNo });

        const individualAccount =
            await individualAccountService.create({
                AccSrNo,
                TrNo,
                Code,
                AccountName,
                GroupName,
                BankSrNo,
                OpClosingRelatedTo,
                AccSrNo,
                OP_Balance,
                CL_Balance,
                ACC_DRCR,
                SYSAcc,
                LY_ACC_DRCR,
                LYCL_Balance,
                LoanDeduct_YN,
                ExceptionChecking,
                ExceptionAmt,
            }, transaction);

        await transaction.commit();

        return res.status(201).send({
            success: true,
            message: "IndividualAccount created successfully",
            result: individualAccount,
        });
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error("Error creating IndividualAccount:", error);
        return handleErrors(error, req, res);
    }
};

exports.getByTrNo = async (req, res) => {
    try {
        const { TrNo } = req.params;

        const individualAccounts =
            await individualAccountService.findByTrNo(TrNo);

        res.status(200).send({
            success: true,
            message: "Fetched successfully",
            result: individualAccounts,
        });
    } catch (error) {
        console.error("Error fetching IndividualAccounts:", error);
        return handleErrors(error, req, res);
    }
};

exports.getAll = async (req, res) => {
    try {
        const { TrNo, AccountName, GroupName } = req.query;
        const filter = {};

        if (TrNo) filter.TrNo = TrNo;
        if (AccountName) filter.AccountName = { [Op.iLike]: `%${AccountName}%` };
        if (GroupName) filter.GroupName = GroupName;

        const individualAccounts =
            await individualAccountService.getAll(filter, true);

        res.status(200).send({
            success: true,
            message: "Fetched successfully",
            result: individualAccounts,
        });
    } catch (error) {
        console.error("Error fetching IndividualAccounts:", error);
        return handleErrors(error, req, res);
    }
};

exports.update = async (req, res) => {
    try {
        const { TrNo } = req.params;
        const {
            AccountName,
            GroupName,
            BankSrNo,
            OpClosingRelatedTo,
            AccSrNo,
            OP_Balance,
            CL_Balance,
            ACC_DRCR,
            SYSAcc,
            LY_ACC_DRCR,
            LYCL_Balance,
            LoanDeduct_YN,
            ExceptionChecking,
            ExceptionAmt,
        } = req.body;

        let dataForUpdate = {};

        if (BankSrNo) dataForUpdate.BankSrNo = BankSrNo;
        if (OpClosingRelatedTo) dataForUpdate.OpClosingRelatedTo = OpClosingRelatedTo;
        if (AccSrNo) dataForUpdate.AccSrNo = AccSrNo;
        if (SYSAcc) dataForUpdate.SYSAcc = SYSAcc;

        if (AccountName) {
            const individualAccounts = await individualAccountService.getAll({ AccountName });
            if (individualAccounts.length > 0) {
                return errorMid(400, `IndividualAccount with accountName: ${AccountName} already exists`, req, res);
            }
            dataForUpdate.AccountName = AccountName;
        }

        if (GroupName) {
            const findGroup = await groupService.findBySrNo(GroupName);
            if (!findGroup) {
                return errorMid(400, `Group with GroupName: ${GroupName} not found`, req, res);
            }
            dataForUpdate.GroupName = GroupName;
        }

        if (ACC_DRCR) {
            if (!["DR", "CR"].includes(ACC_DRCR)) {
                return errorMid(400, `ACC_DRCR: ${ACC_DRCR} not valid. Please provide [DR, CR]`, req, res);
            }
            dataForUpdate.ACC_DRCR = ACC_DRCR;
        }

        if (OP_Balance) {
            if (typeof OP_Balance !== "number") {
                return errorMid(400, `OP_Balance: ${OP_Balance} not valid. Please provide a number`, req, res);
            }
            dataForUpdate.OP_Balance = OP_Balance;
        }

        if (CL_Balance) {
            if (typeof CL_Balance !== "number") {
                return errorMid(400, `CL_Balance: ${CL_Balance} not valid. Please provide a number`, req, res);
            }
            dataForUpdate.CL_Balance = CL_Balance;
        }

        if (LY_ACC_DRCR) {
            if (!["DR", "CR"].includes(LY_ACC_DRCR)) {
                return errorMid(400, `LY_ACC_DRCR: ${LY_ACC_DRCR} not valid. Please provide [DR, CR]`, req, res);
            }
            dataForUpdate.LY_ACC_DRCR = LY_ACC_DRCR;
        }

        if (LYCL_Balance) {
            if (typeof LYCL_Balance !== "number") {
                return errorMid(400, `LYCL_Balance: ${LYCL_Balance} not valid. Please provide a number`, req, res);
            }
            dataForUpdate.LYCL_Balance = LYCL_Balance;
        }

        if (LoanDeduct_YN) {
            if (typeof LoanDeduct_YN !== "boolean") {
                return errorMid(400, `LoanDeduct_YN: ${LoanDeduct_YN} not valid. Please provide [true, false]`, req, res);
            }
            dataForUpdate.LoanDeduct_YN = LoanDeduct_YN;
        }

        if (ExceptionChecking) {
            if (typeof ExceptionChecking !== "boolean") {
                return errorMid(400, `ExceptionChecking: ${ExceptionChecking} not valid. Please provide [true, false]`, req, res);
            }
            dataForUpdate.ExceptionChecking = ExceptionChecking;
        }

        if (ExceptionAmt) {
            if (typeof ExceptionAmt !== "number") {
                return errorMid(400, `ExceptionAmount: ${ExceptionAmt} not valid. Please provide a number`, req, res);
            }
            dataForUpdate.ExceptionAmt = ExceptionAmt;
        }

        if (Object.keys(dataForUpdate).length === 0) {
            return errorMid(400, "Please provide valid data to update", req, res);
        }

        const updatedIndividualAccount = await individualAccountService.update(TrNo, dataForUpdate);

        return res.status(200).json({
            success: true,
            message: "IndividualAccount updated successfully",
            result: updatedIndividualAccount,
        });
    } catch (error) {
        console.error("Error updating IndividualAccount:", error);
        return handleErrors(error, req, res);
    }
};

exports.delete = async (req, res) => {
    try {
        const { TrNo } = req.params;

        const findIndividualAccount = await individualAccountService.findByTrNo(TrNo);
        if (!findIndividualAccount)
            return errorMid(
                400,
                `IndividualAccount with sr_no: ${sr_no} not found`,
                req,
                res
            );

        const deletedIndividualAccount =
            await individualAccountService.delete(TrNo);

        return res.status(200).json({
            success: true,
            message: "IndividualAccount deleted successfully",
            result: deletedIndividualAccount,
        });
    } catch (error) {
        console.error("Error deleting IndividualAccount:", error);
        return handleErrors(error, req, res);
    }
};
