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