const { accountTransTypeModel } = require("../../db/db");

exports.getAll = async (filter) => {
  try {
    const transType = await accountTransTypeModel.findAll({
        where: filter,
    });
    return transType;
  } catch (error) {
    throw error;
  }
};