const accountBreakUp = require("../services/accountBreakUpServices");
const { errorMid } = require("../../middlewareServices/errorMid");

exports.createOne = async (
  TransNo,
  Tr_Type,
  EntryDate,
  TransDate,
  SrNo,
  AccSrNO,
  Amount,
  DRCR,
  AccCode,
  transaction,
  req,
  res
) => {
  try {
    if (!["DR", "CR"].includes(DRCR)) {
      return errorMid(400, "DRCR can only be DR or CR", req, res);
    }
    const breakUpRecord = await accountBreakUp.create(
      {
        TransNo: TransNo,
        Tr_Type: Tr_Type,
        EntryDate: EntryDate,
        Vs_Dt: TransDate,
        SrNo: SrNo,
        AccCode: AccSrNO,
        Amount: Amount,
        DRCR: DRCR,
        PartyCode: AccCode,
      },
      transaction
    );
    // const log = await AuditLogRepository.log(
    //   {
    //     SystemID: req.systemID,
    //     entityName: "account-breakup-srno:0",
    //     entityId: TransNo,
    //     action: "CREATE",
    //     beforeAction: null,
    //     afterAction: breakUpRecord,
    //   },
    //   transaction
    // );
    return breakUpRecord;
  } catch (error) {
    console.log(`Error while genrating account_breakup record: ${error}`);
    throw error;
  }
};

exports.createBulk = async (
  TransNo,
  Tr_Type,
  EntryDate,
  TransDate,
  DRCR,
  accountRecords,
  transaction,
  req,
  res
) => {
  try {
    var storeRecords = [];
    if (DRCR && !["DR", "CR"].includes(DRCR)) {
      return errorMid(400, "DRCR can only be DR or CR", req, res);
    }
    for (i = 0; i < accountRecords.length; i++) {
      var currentRecord = accountRecords[i];
      if (!currentRecord.SrNo) {
        return errorMid(400, "SrNo is required", req, res);
      } 
      if (!currentRecord.AccCode || "") {
        return errorMid(400, "AccCode is required", req, res);
      } 
      if (
        !currentRecord.AccSrNo ||
        typeof currentRecord.AccSrNo != "number"
      ) {
        return errorMid(
          400,
          "AccSrNo is required and it should be a number",
          req,
          res
        );
      } 
      if (
        !currentRecord.Amount ||
        typeof currentRecord.Amount != "number"
      ) {
        return errorMid(
          400,
          "Amount is required and it should be a number",
          req,
          res
        );
      }
      storeRecords.push({
        TransNo: TransNo,
        Tr_Type: Tr_Type,
        EntryDate: EntryDate,
        Vs_Dt: TransDate,
        SrNo: currentRecord.SrNo,
        AccCode: currentRecord.AccSrNo,
        Amount: currentRecord.Amount,
        DRCR: DRCR,
        PartyCode: currentRecord.AccCode,
      });
    }
    const breakUpRecord = await accountBreakUp.bulkCreate(
      storeRecords,
      transaction
    );
    // const log = await AuditLogRepository.log(
    //   {
    //     SystemID: req.systemID,
    //     entityName: "account-breakup-bulk-record",
    //     entityId: TransNo,
    //     action: "CREATE",
    //     beforeAction: null,
    //     afterAction: breakUpRecord,
    //   },
    //   transaction
    // );
    return breakUpRecord;
  } catch (error) {
    console.log(`Error while genrating account_breakup records: ${error}`);
    throw error;
  }
};

exports.getByTransNo = async (TransNo) => {
  try {
    const breakUpRecord = await accountBreakUp.getAll({
      TransNo: TransNo,
    });
    return breakUpRecord;
  } catch (error) {
    console.log(`Error while fetching account_breakup records: ${error}`);
    throw error;
  }
};

exports.updateByTransNoAndSrNo = async (
  EntryNo,
  SrNo,
  updatedFields,
  transaction
) => {
  try {
    if (updatedFields.AccCode) {
      if (
        updatedFields.AccCode == "" ||
        typeof updatedFields.AccCode != "string"
      ) {
        return errorMid(400, "AccCode should be string", req, res);
      }
    } 
    if (updatedFields.AccSrNo) {
      if (typeof updatedFields.AccSrNo != "number") {
        return errorMid(400, "AccSrNo should be a number", req, res);
      }
    }
    if (updatedFields.Amount) {
      if (typeof updatedFields.Amount != "number") {
        return errorMid(400, "Amount should be a number", req, res);
      }
    }
    const breakUpRecord = await accountBreakUp.update(
      {
        EntryNo,
        SrNo,
      },
      updatedFields,
      transaction
    );
    return breakUpRecord;
  } catch (error) {
    console.log(`Error while updating account_breakup records: ${error}`);
    throw error;
  }
};

exports.delete = async (EntryNo, SrNo, transaction) => {
  try {
    const breakUpRecord = await accountBreakUp.delete(
      {
        EntryNo,
        SrNo,
      },
      transaction
    );
    return true;
  } catch (error) {
    console.log(`Error while deleting account_breakup records: ${error}`);
    throw error;
  }
};

exports.deleteByEntryNo = async (EntryNo, transaction) => {
  try {
    const breakUpRecord = await accountBreakUp.delete(
      {
        EntryNo,
      },
      transaction
    );
    return true;
  } catch (error) {
    console.log(`Error while deleting account_breakup records: ${error}`);
    throw error;
  }
};
