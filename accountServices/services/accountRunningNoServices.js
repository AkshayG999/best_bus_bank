const { where } = require("sequelize");
const { accountRunningNoModel } = require("../../db/db");

exports.getByBranchAndInit = async (InitNo, Branch_No) => {
  try {
    const record = await accountRunningNoModel.findOne({
      where: {
        InitNo: InitNo,
        Branch_No: Branch_No,
      },
    });
    return record;
  } catch (error) {
    throw error;
  }
};

exports.updateByBranchAndInit = async (InitNo, Branch_No, transaction,transNo) => {
  try {
    const record = await accountRunningNoModel.update(
      { RunningNo: transNo },
      {
        where: {
          InitNo: InitNo,
          Branch_No: Branch_No,
        },
        returning: true,
        transaction: transaction, 
      },
    );
    if (record[0] === 0) {
      throw new Error(
        `No record found with InitNo ${InitNo} and Branch_No ${Branch_No}.`
      );
    }
    return record[1];
  } catch (error) {
    throw error;
  }
};
