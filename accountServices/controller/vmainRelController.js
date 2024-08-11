const vmainRelServices = require("../services/vmainRelServices");
const { errorMid } = require("../../middlewareServices/errorMid");

exports.createBulk = async (EntryNo, accountRecords, transaction, req, res) => {
  try {
    var storeRecords = [];
    for (i = 0; i < accountRecords.length; i++) {
      var currentRecord = accountRecords[i];
      if (!currentRecord.SrNo) {
        return errorMid(400, "SrNo is required", req, res);
      } 
      if (!currentRecord.AccCode || "") {
        return errorMid(400, "AccCode is required", req, res);
      }
      if (!currentRecord.AccDesc || "") {
        return errorMid(400, "AccDesc is required", req, res);
      } 
      if (
        currentRecord.TrType &&
        currentRecord.TrType != "" &&
        !["Debit", "Credit"].includes(currentRecord.TrType)
      ) {
        return errorMid(400, "TrType can only be Debit or Credit", req, res);
      } 
      if (
        (currentRecord.Amount && typeof currentRecord.Amount != "number") ||
        (currentRecord.Debit && typeof currentRecord.Debit != "number") ||
        (currentRecord.Credit && typeof currentRecord.Credit != "number") ||
        (currentRecord.AccSrNo && typeof currentRecord.AccSrNo != "number")
      ) {
        return errorMid(
          400,
          "Amount, Debit, Credit,AccSrNo showuld be a number",
          req,
          res
        );
      } 
      if (
        currentRecord.TRMode &&
        typeof currentRecord.TRMode != "string"
      ) {
        return errorMid(400, "TRMode should be a string", req, res);
      } 
      if (
        currentRecord.Remarks &&
        typeof currentRecord.Remarks != "string"
      ) {
        return errorMid(400, "Remarks should be a string", req, res);
      }
      storeRecords.push({
        EntryNo: EntryNo,
        SrNo: currentRecord.SrNo,
        AccCode: currentRecord.AccCode,
        AccDesc: currentRecord.AccDesc,
        Amount: currentRecord.Amount,
        TrType: currentRecord.TrType,
        Debit: currentRecord.Debit,
        Credit: currentRecord.Credit,
        Remarks: currentRecord.Remarks,
        Acc_No: currentRecord.AccSrNo,
        TRMode: currentRecord.TRMode,
      });
    }
    const vRelRecords = await vmainRelServices.bulkCreate(
      storeRecords,
      transaction
    );
    // const log = await AuditLogRepository.log(
    //   {
    //     SystemID: req.systemID,
    //     entityName: "vmain-rel",
    //     entityId: EntryNo,
    //     action: "CREATE",
    //     beforeAction: null,
    //     afterAction: vRelRecords,
    //   },
    //   transaction
    // );
    return vRelRecords;
  } catch (error) {
    console.log(`Error while genrating v_main_rel records: ${error}`);
    throw error;
  }
};

exports.getByEntryNo = async (EntryNo) => {
  try {
    const vmainRelRecords = await vmainRelServices.getAll({
      EntryNo: EntryNo,
    });
    return vmainRelRecords;
  } catch (error) {
    console.log(`Error while fetching v_main_rel records: ${error}`);
    throw error;
  }
};

exports.updateByEntryNoAndSrNo = async (
  EntryNo,
  SrNo,
  updatedFields,
  transaction
) => {
  try {
    const fieldToUpdate = {};
    if (updatedFields.AccSrNo) {
      if (typeof updatedFields.AccSrNo != "number") {
        return errorMid(400, "AccSrNo should be number", req, res);
      }
      fieldToUpdate.AccSrNo = updatedFields.AccSrNo;
    }
    if (updatedFields.AccCode) {
      if (
        typeof updatedFields.AccCode != "string" ||
        updatedFields.AccCode == ""
      ) {
        return errorMid(400, "AccCode should be string and valid", req, res);
      }
      fieldToUpdate.AccCode = updatedFields.AccCode;
    }
    if (updatedFields.AccDesc) {
      if (
        typeof updatedFields.AccDesc != "string" ||
        updatedFields.AccDesc == ""
      ) {
        return errorMid(400, "AccDesc is required", req, res);
      }
      fieldToUpdate.AccDesc = updatedFields.AccDesc;
    }
    if (updatedFields.TrType) {
      if (
        updatedFields.TrType != "" &&
        !["Debit", "Credit"].includes(updatedFields.TrType)
      ) {
        return errorMid(400, "TrType can only be Debit or Credit", req, res);
      }
      fieldToUpdate.TrType = updatedFields.TrType;
    }
    if (updatedFields.Amount) {
      if (typeof updatedFields.Amount != "number") {
        return errorMid(400, "Amount provided should be a number", req, res);
      }
      fieldToUpdate.Amount = updatedFields.Amount;
    }
    if (updatedFields.Debit) {
      if (typeof updatedFields.Debit != "number") {
        return errorMid(400, "Debit provided should be a number", req, res);
      }
      fieldToUpdate.Debit = updatedFields.Debit;
    }
    if (updatedFields.Credit) {
      if (typeof updatedFields.Credit != "number") {
        return errorMid(400, "Credit provided should be a number", req, res);
      }
      fieldToUpdate.Credit = updatedFields.Credit;
    }
    if (updatedFields.TRMode) {
      if (
        typeof updatedFields.TRMode != "string" ||
        updatedFields.TRMode == ""
      ) {
        return errorMid(400, "TRMode should be a string", req, res);
      }
      fieldToUpdate.TRMode = updatedFields.TRMode;
    }
    if (updatedFields.Remarks) {
      if (
        typeof updatedFields.Remarks != "string" ||
        updatedFields.Remarks == ""
      ) {
        return errorMid(400, "Remarks should be a string", req, res);
      }
      fieldToUpdate.Remarks = updatedFields.Remarks;
    }
    const vmainRelRecords = await vmainRelServices.update(
      {
        EntryNo,
        SrNo,
      },
      fieldToUpdate,
      transaction
    );
    return vmainRelRecords;
  } catch (error) {
    console.log(`Error while updating v_main_rel records: ${error}`);
    throw error;
  }
};

exports.delete = async (EntryNo, SrNo, transaction) => {
  try {
    const vmainRelRecords = await vmainRelServices.delete(
      {
        EntryNo,
        SrNo,
      },
      transaction
    );
    return true;
  } catch (error) {
    console.log(`Error while deleting v_main_rel records: ${error}`);
    throw error;
  }
};

exports.deleteByEntryNo = async (EntryNo, transaction) => {
  try {
    const vmainRelRecords = await vmainRelServices.delete(
      {
        EntryNo,
      },
      transaction
    );
    return true;
  } catch (error) {
    console.log(`Error while deleting v_main_rel records: ${error}`);
    throw error;
  }
};
