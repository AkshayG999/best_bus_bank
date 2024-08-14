const vmain = require("../services/vmainServices");
const vmainRel = require("../controller/vmainRelController");
const accountBreakUp = require("../controller/accountBreakUpController");
const accountServices = require("../../master_data_entry/services/individualAccountService");
const branchServices = require("../../master_data_entry/services/branchService");
const { sequelize } = require("../../db/db");
const { Sequelize, Op } = require("sequelize");
const { handleErrors, errorMid } = require("../../middlewareServices/errorMid");
const helpers = require("../helpers/account_id_generator");
const AuditLogRepository = require("../../auditServices/auditLogService");

exports.create = async (req, res, next) => {
  const transaction = await sequelize.transaction({
    isolationLevel: Sequelize.Transaction.SERIALIZABLE,
  });
  try {
    let {
      EntryDate,
      // Type can be "CB", "PC", "BB", "JV", "CE"
      type,
      //Transtype can be 1 for Receipt and 2 for payment from accountTransTypeModel
      Transtype,
      TransDate,
      Amount, //Number
      //Branch_Tr of branch for CashAccSrNo and for calculating TransNo
      Branch_Tr, //String from branch model
      BranchAccSrNo, //Number CashAccSrNo or pettycash or bankbook
      Narration, //String
      //mem_srno from memberInformation to keep track with member data
      mem_srno, //Number
      //MemCode from memberInformation to keep track with member data
      LCode, //String
      //Array of amount breakup info.
      //{ "SrNo": number, "AccCode": string Code from Account, "AccDesc": string AccountName from Account,
      // "TrType": Debit or Credit Mostly null, "Amount": Number, "Debit": Number mostly null,
      // "Credit": Number mostly null, "Remarks": string mostly null,"UserNam": Same value as lcode above
      // "AccSrNo": Number accsrno from Account, "TRMode": string 1 or 2,}
      accountInfo,
      // 0 for no and 1 for yes
      // AppYesNo,
      // AppDate,
      // AppBy,//String
      V_CHKNO,
      PIN,
    } = req.body;
    if (!EntryDate || isNaN(new Date(EntryDate))) {
      return errorMid(
        400,
        `Entry Date is required or the EntryDate provided is not a valid date object`,
        req,
        res
      );
    }
    if (!TransDate || isNaN(new Date(TransDate))) {
      return errorMid(
        400,
        `Trans Date is required or the TransDate provided is not a valid date onject`,
        req,
        res
      );
    }
    if (!["CB", "PC", "BB", "JV", "CE"].includes(type)) {
      return errorMid(400, "type provided is not valid", req, res);
    }
    if (![1, 2].includes(Transtype)) {
      return errorMid(400, "Transtype provided is not valid", req, res);
    }
    if (
      typeof Amount != "number" ||
      typeof mem_srno != "number"
    ) {
      return errorMid(
        400,
        "Amount and mem_srno provided should be number",
        req,
        res
      );
    }
    if (
      typeof Branch_Tr != "string" ||
      typeof LCode != "string"
      //  || (AppBy && typeof AppBy != "string")
    ) {
      return errorMid(
        400,
        "Branch_Tr and LCode provided should be string",
        req,
        res
      );
    }
    if (Narration && typeof Narration != "string") {
      return errorMid(400, "Narration provided should be string", req, res);
    }
    if (type == "BB") {
      if (!V_CHKNO || typeof V_CHKNO != "string") {
        return errorMid(
          400,
          "V_CHKNO is required and it should be string",
          req,
          res
        );
      }
      if (!PIN || typeof PIN != "string") {
        return errorMid(
          400,
          "PIN is required and it should be string",
          req,
          res
        );
      }
    }

    if (type == "CB" || type == "PC" || type == "BB") {
      if (
        Amount !=
        accountInfo.reduce((total, currentVal) => total + currentVal.Amount, 0)
      ) {
        return errorMid(
          400,
          "Amount provided is not equal to the sum of amount breakup",
          req,
          res
        );
      }
    } else if (type == "JV" || type == "CE") {
      if (
        accountInfo.reduce(
          (total, currentVal) => total + currentVal.Debit,
          0
        ) !=
        accountInfo.reduce((total, currentVal) => total + currentVal.Credit, 0)
      ) {
        return errorMid(
          400,
          "Credit and the debit amount provided in the amount breakup does not match",
          req,
          res
        );
      }
      if (
        Amount !=
        accountInfo.reduce((total, currentVal) => total + currentVal.Debit, 0)
      ) {
        return errorMid(
          400,
          "Overall amount does not match up with the amount breakup",
          req,
          res
        );
      }
    }

    // if(AppYesNo && ![0,1].includes(AppYesNo)){
    //   return errorMid(
    //     400,
    //     "AppYesNo can only be 0 and 1",
    //     req,
    //     res
    //   );
    // }
    // if (AppDate && !isNaN(new Date(AppDate))) {
    //   return errorMid(
    //     400,
    //     `AppDate should be of type datetime`,
    //     req,
    //     res
    //   );
    // }

    //Calling function to create EntryNo
    const entryNo = await helpers.createEntryNo(type, transaction);
    if (entryNo === null) {
      return errorMid(400, `No autoNo record to create EntryNo`, req, res);
    }
    const initNo = helpers.accountInitNo(type, Transtype);
    //Calling function to create TransNo
    const transNo = await helpers.createTransNo(initNo, Branch_Tr, transaction);
    if (transNo === null) {
      return errorMid(400, `No runningNo record to create TransNo`, req, res);
    }

    const vmainRecord = await vmain.create(
      {
        TransNo: entryNo,
        TransDt: new Date(EntryDate),
        V_TYPE: initNo,
        TransType: Transtype,
        AccNo: transNo,
        V_DT: new Date(TransDate),
        Amount: Amount,
        Acc_No: BranchAccSrNo,
        Narrionation: Narration,
        V_ENO: mem_srno,
        LCODE: LCode,
        LDATE: Date.now(),
        Trans_Branch: Branch_Tr,
        V_CHKNO: V_CHKNO,
        PIN: PIN,
        // AppYesNo: AppYesNo,
        // AppDate: AppDate,
        // AppBy: AppBy,
      },
      transaction
    );
    if (!vmainRecord) {
      return errorMid(400, `Failed to create vmain account records`, req, res);
    }

    const vmainRelRecords = await vmainRel.createBulk(
      entryNo,
      accountInfo,
      transaction,
      type,
      req,
      res
    );

    if (!vmainRelRecords) {
      return errorMid(400, `Failed to create vmainRel records`, req, res);
    }
    if (type == "CB" || type == "PC" || type == "BB") {
    if (
      typeof BranchAccSrNo != "number"
    ) {
      return errorMid(
        400,
        "BranchAccSrNo provided should be number",
        req,
        res
      );
    }
      const accountRecord = await accountServices.findByFilter({
        AccSrNo: BranchAccSrNo,
      });
      if (!accountRecord) {
        return errorMid(
          400,
          `No account record with BrachAccSrNo: ${BranchAccSrNo}`,
          req,
          res
        );
      }
      const createAccountBreakupWithSrno0 = await accountBreakUp.createOne(
        entryNo,
        initNo,
        new Date(EntryDate),
        new Date(TransDate),
        0,
        BranchAccSrNo,
        Amount,
        Transtype == 1 ? "DR" : "CR",
        accountRecord.Code,
        transaction,
        req,
        res
      );
      if (!createAccountBreakupWithSrno0) {
        return errorMid(
          400,
          `Failed to create accountBreakUp records with SrNo 0`,
          req,
          res
        );
      }
    }

    let newAccountInfo;
    if (type == "CB" || type == "PC" || type == "BB") {
      newAccountInfo = accountInfo.map((item) => {
        return {
          ...item,
          DRCR: Transtype == 1 ? "CR" : "DR",
        };
      });
    } else if (type == "JV" || type == "CE") {
      newAccountInfo = accountInfo.map((item) => {
        const { TrType, Debit, Credit, ...rec } = item;
        rec.DRCR = TrType == "Debit" ? "DR" : "CR";
        rec.Amount = TrType == "Debit" ? Debit : Credit;
        return rec;
      });
    }
    const createAccountBreakupRecords = await accountBreakUp.createBulk(
      entryNo,
      initNo,
      new Date(EntryDate),
      new Date(TransDate),
      newAccountInfo,
      transaction,
      req,
      res
    );
    if (!createAccountBreakupRecords) {
      return errorMid(
        400,
        `Failed to create accountBreakUp records with SrNo 0`,
        req,
        res
      );
    }
    //Have to work on creating vmain record here Signing off

    const log = await AuditLogRepository.log(
      {
        SystemID: req.systemID,
        entityName: "accounts-record",
        entityId: entryNo,
        action: "CREATE",
        beforeAction: null,
        afterAction: vmainRecord,
      },
      transaction
    );

    await transaction.commit();

    return res.status(201).send({
      success: true,
      message: "Account record saved successfully",
      result: { vmainRecord, vmainRelRecords },
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.error("Error creating vmain and its related records", error);
    return next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const vmainRecordsUnapprovedRecords = await vmain.getAll({
      order: [["TransDt", "DESC"]],
      where: {
        AppYesNo: null,
        AppDate: null,
        AppBy: null,
      },
    });

    const vmainRecordsApprovedRecords = await vmain.getAll({
      order: [["TransDt", "DESC"]],
      where: {
        AppYesNo: {
          [Op.ne]: null,
        },
        AppDate: {
          [Op.ne]: null,
        },
        AppBy: {
          [Op.ne]: null,
        },
      },
    });
    const vmainRecords = [
      ...vmainRecordsUnapprovedRecords,
      ...vmainRecordsApprovedRecords,
    ];
    res.status(200).send({
      success: true,
      message: "Records Fetched successfully",
      result: vmainRecords,
    });
  } catch (error) {
    console.error("Error fetching account records:", error);
    return next(error, req, res);
  }
};

exports.getUnapprovedRecords = async (req, res, next) => {
  try {
    const vmainRecordsUnapprovedRecords = await vmain.getAll({
      order: [["TransDt", "DESC"]],
      where: {
        AppYesNo: null,
        AppDate: null,
        AppBy: null,
      },
    });

    res.status(200).send({
      success: true,
      message: "Records Fetched successfully",
      result: vmainRecordsUnapprovedRecords,
    });
  } catch (error) {
    console.error("Error fetching account records:", error);
    return next(error, req, res);
  }
};

exports.getByEntryNo = async (req, res, next) => {
  try {
    const { EntryNo } = req.params;

    const vmainRecord = await vmain.findByFilter({
      TransNo: EntryNo,
    });
    const accountBreakUpRecords = await accountBreakUp.getByTransNo(EntryNo);
    const vmainRelRecords = await vmainRel.getByEntryNo(EntryNo);

    if (!vmainRecord) {
      return errorMid(
        400,
        `Account record with EntryNo: [${EntryNo}] not found`,
        req,
        res
      );
    }
    if (!accountBreakUpRecords || accountBreakUpRecords.length < 1) {
      return errorMid(
        400,
        `Account break up of the overall amount featured in account record with TransNo: [${EntryNo}] not found`,
        req,
        res
      );
    }
    if (!vmainRelRecords || vmainRelRecords.length < 1) {
      return errorMid(
        400,
        `Vmain_Rel account break up of the overall amount featured in account record with TransNo: [${EntryNo}] not found`,
        req,
        res
      );
    }

    res.status(200).send({
      success: true,
      message: "Records fetched successfully",
      result: {
        vmainRecord,
        accountBreakUpRecords,
        vmainRelRecords,
      },
    });
  } catch (error) {
    console.error("Error fetching Account Records:", error);
    return next(error, req, res);
  }
};

exports.update = async (req, res, next) => {
  const transaction = await sequelize.transaction({
    isolationLevel: Sequelize.Transaction.SERIALIZABLE,
  });
  try {
    const { EntryNo } = req.params;
    let {
      // Type can be "CB", "PC", "BB", "JV", "CE"
      type,
      //Transtype can be 1 for Receipt and 2 for payment from accountTransTypeModel
      Transtype,
      TransDate,
      Amount, //Number
      Narration, //String
      //mem_srno from memberInformation to keep track with member data
      mem_srno, //Number
      //MemCode from memberInformation to keep track with member data
      LCode, //String
      //Array of amount breakup info.
      //{ "SrNo": number mandatory, "AccCode": string Code from Account if updated, "AccDesc": string AccountName from Account if updated,
      // "AccSrNo": Number AccSrNo from Account if updated, "TrType": Debit or Credit Mostly null if updated, "Amount": Number if updated, "Debit": Number mostly null if updated,
      // "Credit": Number mostly null if updated, "Remarks": string mostly null if updated,"UserNam": Same value as lcode above
      // "TRMode": string 1 or 2 if TransType changed,isCreate: true if a new record added with breakup,
      //isUpdate: if this is going to be updated, isDelete: if this is going to be deleted.}
      accountInfo,
      // 0 for no and 1 for yes
      AppYesNo,
      AppDate,
      AppBy, //String MemCode from memberInformation of member approving record
      V_CHKNO,
      PIN,
    } = req.body; //req.body
    var dataToUpdate = {};
    var accountBreakUpSrNo0UpdateData = {};
    var initNo;
    if (TransDate) {
      if (isNaN(new Date(TransDate))) {
        return errorMid(
          400,
          `Trans Date provided is not a valid date object`,
          req,
          res
        );
      }
      dataToUpdate.V_DT = new Date(TransDate);
      accountBreakUpSrNo0UpdateData.Vs_Dt = new Date(TransDate);
    }
    if (!["CB", "PC", "BB", "JV", "CE"].includes(type)) {
      return errorMid(400, "type provided is not valid", req, res);
    }
    if (Transtype) {
      if (![1, 2].includes(Transtype)) {
        return errorMid(400, "Transtype provided is not valid", req, res);
      }
      dataToUpdate.TransType = Transtype;
      initNo = helpers.accountInitNo(type, Transtype);
      accountBreakUpSrNo0UpdateData.Tr_Type = initNo;
      accountBreakUpSrNo0UpdateData.DRCR = Transtype == 1 ? "DR" : "CR";
      dataToUpdate.V_TYPE = initNo;
    }
    if (Narration) {
      if (typeof Narration != "string" || Narration.length < 1) {
        return errorMid(
          400,
          "Narration provided should be string and has some length",
          req,
          res
        );
      }
      dataToUpdate.Narrionation = Narration;
    }
    if (LCode) {
      if (typeof LCode != "string" || LCode.length < 1) {
        return errorMid(
          400,
          "LCode provided should be string and valid",
          req,
          res
        );
      }
      dataToUpdate.LCODE = LCode;
    }
    if (mem_srno) {
      if (typeof mem_srno != "number") {
        return errorMid(400, "mem_srno provided should be number", req, res);
      }
      dataToUpdate.V_ENO = mem_srno;
    }
    if (type == "BB") {
      if (V_CHKNO) {
        if (typeof V_CHKNO != "string" || V_CHKNO.length < 1) {
          return errorMid(
            400,
            "V_CHKNO provided should be string and valid",
            req,
            res
          );
        }
        dataToUpdate.V_CHKNO = V_CHKNO;
      }
      if (PIN) {
        if (typeof PIN != "string" || PIN.length < 1) {
          return errorMid(
            400,
            "PIN provided should be string and valid",
            req,
            res
          );
        }
        dataToUpdate.PIN = PIN;
      }
    }
    if (Amount) {
      if (typeof Amount != "number") {
        return errorMid(400, "Amount provided should be number", req, res);
      }
      dataToUpdate.Amount = Amount;
      accountBreakUpSrNo0UpdateData.Amount = Amount;
    }
    if (Amount && (!accountInfo || accountInfo.length < 1)) {
      return errorMid(
        400,
        "If updated amount provided, a break up should be created, updated or deleted",
        req,
        res
      );
    }
    if (AppYesNo) {
      if (![0, 1].includes(AppYesNo)) {
        return errorMid(400, "AppYesNo can only be 0 and 1", req, res);
      }
      dataToUpdate.AppYesNo = AppYesNo;
    }
    if (AppDate) {
      if (isNaN(new Date(AppDate))) {
        return errorMid(
          400,
          `AppDate provided is not a valid date onject`,
          req,
          res
        );
      }
      dataToUpdate.AppDate = AppDate;
    }
    if (AppBy) {
      if (typeof AppBy != "string" || AppBy.length < 1) {
        return errorMid(400, "AppBy should be string and valid", req, res);
      }
      dataToUpdate.AppBy = AppBy;
    }

    const vmainRecordBefore = await vmain.findByFilter({
      TransNo: EntryNo,
    });
    if (!vmainRecordBefore) {
      return errorMid(
        400,
        `Account record with EntryNo: [${EntryNo}] not found`,
        req,
        res
      );
    }

    const vmainRelRecordsBefore = await vmainRel.getByEntryNo(EntryNo);
    if (!vmainRelRecordsBefore) {
      return errorMid(
        400,
        `No vmain_rel records with EntryNo: ${EntryNo}`,
        req,
        res
      );
    }
    if (type == "CB" || type == "PC" || type == "BB") {
      var tot = vmainRelRecordsBefore.reduce(
        (sum, currentVal) => sum + parseInt(currentVal.Amount),
        0
      );
      for (i = 0; i < accountInfo.length; i++) {
        var currentRecord = accountInfo[i];
        if (currentRecord.isCreate) {
          tot += currentRecord.Amount;
        } else if (currentRecord.isDelete) {
          tot -= currentRecord.Amount;
        } else if (currentRecord.isUpdate) {
          const prev = vmainRelRecordsBefore.find(
            (record) => record.SrNo == currentRecord.SrNo
          );
          tot -= prev.Amount;
          tot += currentRecord.Amount;
        }
      }

      if (tot != Amount) {
        return errorMid(
          400,
          `Amount provided is not equal to the sum of account break up records`,
          req,
          res
        );
      }
    } else if (type == "JV" || type == "CE") {
      var credTot = vmainRelRecordsBefore.reduce(
        (sum, currentVal) => sum + parseInt(currentVal.Credit),
        0
      );
      var debTot = vmainRelRecordsBefore.reduce(
        (sum, currentVal) => sum + parseInt(currentVal.Debit),
        0
      );
      for (i = 0; i < accountInfo.length; i++) {
        var currentRecord = accountInfo[i];
        if (currentRecord.isCreate) {
          credTot += currentRecord.Credit;
          debTot += currentRecord.Debit;
        } else if (currentRecord.isDelete) {
          credTot -= currentRecord.Credit;
          debTot -= currentRecord.Debit;
        } else if (currentRecord.isUpdate) {
          const prev = vmainRelRecordsBefore.find(
            (record) => record.SrNo == currentRecord.SrNo
          );
          credTot -= prev.Credit;
          debTot -= prev.Debit;
          credTot += currentRecord.Credit;
          debTot += currentRecord.Debit;
        }
      }
      if (credTot != debTot) {
        return errorMid(
          400,
          `Total credit is not equal to the total debit provided for the account breakup`,
          req,
          res
        );
      }
      if (credTot != Amount) {
        return errorMid(
          400,
          `Overall Amount provided is not equal to the sum of account break up records`,
          req,
          res
        );
      }
    }

    for (var i = 0; i < accountInfo.length; i++) {
      var currentRecord = accountInfo[i];
      if (currentRecord.isDelete) {
        const result = await vmainRel.delete(
          EntryNo,
          currentRecord.SrNo,
          transaction
        );
        if (!result) {
          return errorMid(
            400,
            `Failed to delete vmainRel record with EntryNo: ${EntryNo} and SrNo: ${currentRecord.SrNo}`,
            req,
            res
          );
        }
      } else if (currentRecord.isUpdate) {
        const { SrNo, isUpdate, ...rec } = currentRecord;
        const result = await vmainRel.updateByEntryNoAndSrNo(
          EntryNo,
          SrNo,
          rec,
          type,
          transaction
        );
        if (!result) {
          return errorMid(
            400,
            `Failed to update vmainRel record with EntryNo: ${EntryNo} and SrNo: ${SrNo}`,
            req,
            res
          );
        }
      } else if (currentRecord.isCreate) {
        const { isCreate, ...rec } = currentRecord;
        const vmainRelRecords = await vmainRel.createBulk(
          EntryNo,
          [rec],
          transaction,
          type,
          req,
          res
        );
        if (!vmainRelRecords) {
          return errorMid(
            400,
            `Failed to create new vmainRel record`,
            req,
            res
          );
        }
      }
    }

    if (type == "CB" || type == "PC" || type == "BB") {
      if (Object.keys(accountBreakUpSrNo0UpdateData).length > 0) {
        const updateeAccountBreakupWithSrno0 =
          await accountBreakUp.updateByTransNoAndSrNo(
            EntryNo,
            0,
            accountBreakUpSrNo0UpdateData,
            transaction
          );
        if (!updateeAccountBreakupWithSrno0) {
          return errorMid(
            400,
            `Failed to create accountBreakUp records with SrNo 0`,
            req,
            res
          );
        }
      }
    }

    const accountBreakUpRecordsBefore = await accountBreakUp.getByTransNo(
      EntryNo
    );
    if (!accountBreakUpRecordsBefore) {
      return errorMid(
        400,
        `No accoutn_breakup records with EntryNo: ${EntryNo}`,
        req,
        res
      );
    }

    for (i = 0; i < accountInfo.length; i++) {
      var currentRecord = accountInfo[i];
      if (currentRecord.isDelete) {
        const deleteBreakUpRecord = await accountBreakUp.delete(
          EntryNo,
          currentRecord.SrNo,
          transaction
        );
        if (!deleteBreakUpRecord) {
          return errorMid(
            400,
            `Failed to delete account_breakup record with EntryNo: ${EntryNo} and SrNo: ${currentRecord.SrNo}`,
            req,
            res
          );
        }
      } else if (currentRecord.isUpdate) {
        const { SrNo, isUpdate, ...rec } = currentRecord;
        var dataFieldToUpdate = { ...rec };
        if (accountBreakUpSrNo0UpdateData.Tr_Type) {
          dataFieldToUpdate.Tr_Type = accountBreakUpSrNo0UpdateData.Tr_Type;
        }
        if (accountBreakUpSrNo0UpdateData.Vs_Dt) {
          dataFieldToUpdate.Vs_Dt = accountBreakUpSrNo0UpdateData.Vs_Dt;
        }
        if (type == "CB" || type == "PC" || type == "BB") {
          if (currentRecord.TRMODE) {
            dataFieldToUpdate.DRCR = currentRecord.TRMODE == 1 ? "CR" : "DR";
          }
        } else if (type == "JV" || type == "CE") {
          dataFieldToUpdate.DRCR = rec.TrType == "Debit" ? "DR" : "CR";
          dataFieldToUpdate.Amount =
            rec.TrType == "Debit" ? rec.Debit : rec.Credit;
        }
        const result = await accountBreakUp.updateByTransNoAndSrNo(
          EntryNo,
          SrNo,
          dataFieldToUpdate,
          transaction
        );
        if (!result) {
          return errorMid(
            400,
            `Failed to update account_breakup record with EntryNo: ${EntryNo} and SrNo: ${SrNo}`,
            req,
            res
          );
        }
      } else if (currentRecord.isCreate) {
        const { isCreate, ...rec } = currentRecord;
        let DRCR;
        let amount;
        if (type == "CB" || type == "PC" || type == "BB") {
          DRCR = rec.TRMODE == 1 ? "CR" : "DR";
          amount = rec.Amount;
        } else if (type == "JV" || type == "CE") {
          DRCR = rec.TrType == "Debit" ? "DR" : "CR";
          amount = rec.TrType == "Debit" ? rec.Debit : rec.Credit;
        }
        const createNewBreakUpRecord = await accountBreakUp.createOne(
          EntryNo,
          initNo,
          accountBreakUpRecordsBefore[0].EntryDate,
          accountBreakUpRecordsBefore[0].Vs_Dt,
          rec.SrNo,
          rec.AccSrNo,
          amount,
          DRCR,
          rec.AccCode,
          transaction,
          req,
          res
        );
        if (!createNewBreakUpRecord) {
          return errorMid(
            400,
            `Failed to create new accountBreakUp records for updated amount`,
            req,
            res
          );
        }
      }
    }

    const vmainRecordAfterUpdate = await vmain.update(
      EntryNo,
      dataToUpdate,
      transaction
    );

    if (!vmainRecordAfterUpdate) {
      return errorMid(400, `Failed to update vmain account records`, req, res);
    }
    const log = await AuditLogRepository.log(
      {
        SystemID: req.systemID,
        entityName: "accounts-record",
        entityId: EntryNo,
        action: "UPDATE",
        beforeAction: vmainRecordBefore,
        afterAction: vmainRecordAfterUpdate,
      },
      transaction
    );
    await transaction.commit();
    return res.status(200).send({
      success: true,
      message: "Account record updated successfully",
      result: vmainRecordAfterUpdate,
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.error("Error updating Account Records:", error);
    return next(error, req, res);
  }
};

exports.delete = async (req, res, next) => {
  const transaction = await sequelize.transaction({
    isolationLevel: Sequelize.Transaction.SERIALIZABLE,
  });
  try {
    const { EntryNo } = req.params;
    const vmainBefore = await vmain.findByFilter({ TransNo: EntryNo });
    const vmainRecord = await vmain.delete(EntryNo, transaction);
    if (!vmainRecord) {
      return errorMid(
        400,
        `Failed to delete vmain record with EntryNo: [${EntryNo}]`,
        req,
        res
      );
    }
    const vmainRelRecords = await vmainRel.deleteByEntryNo(
      EntryNo,
      transaction
    );
    if (!vmainRelRecords) {
      return errorMid(
        400,
        `Failed to delete all vmain_rel records associated with EntryNo: [${EntryNo}]`,
        req,
        res
      );
    }

    const deleteAccountBreakUpRecords = await accountBreakUp.deleteByEntryNo(
      EntryNo,
      transaction
    );
    if (!deleteAccountBreakUpRecords) {
      return errorMid(
        400,
        `Failed to delete accountBreakUp records for EntryNo: [${EntryNo}]`,
        req,
        res
      );
    }

    const log = await AuditLogRepository.log(
      {
        SystemID: req.systemID,
        entityName: "vmain",
        entityId: EntryNo,
        action: "DELETE",
        beforeAction: vmainBefore,
        afterAction: null,
      },
      transaction
    );
    await transaction.commit();
    return res.status(200).send({
      success: true,
      message: "Vmain account records deleted successfully",
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.error("Error deleting Vmain Account Records:", error);
    return next(error, req, res);
  }
};
