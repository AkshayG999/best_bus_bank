const { where } = require("sequelize");
const { autoNoForAllModel } = require("../../db/db");

exports.getAll = async (filter) => {
  try {
    const autoNoForAll = await autoNoForAllModel.findAll({
        where: filter,
    });
    return autoNoForAll;
  } catch (error) {
    throw error;
  }
};

exports.getOne = async (filter) => {
  try {
    const autoNoForAll = await autoNoForAllModel.findOne({
        where: filter,
    });
    return autoNoForAll;
  } catch (error) {
    throw error;
  }
};

exports.updateByTypeAndFYear = async (type, fYear, transaction, autoID) => {
  try {
    const record = await autoNoForAllModel.update(
      { autoId: autoID },
      {
        where: {
          type: type,
          fYear: fYear,
        },
        returning: true,
        transaction: transaction, 
      },
    );
    if (record[0] === 0) {
      throw new Error(
        `No record found with type ${type} and fYear ${fYear}.`
      );
    }
    return record[1];
  } catch (error) {
    throw error;
  }
};