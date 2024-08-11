const { vmainRelModel } = require("../../db/db");

exports.create = async (data, transaction) => {
  try {
    const vmainRel = await vmainRelModel.create(data, { transaction });
    return vmainRel;
  } catch (error) {
    throw error;
  }
};

exports.bulkCreate = async (data, transaction) => {
  try {
    const vmainRel = await vmainRelModel.bulkCreate(
      data,
      {
        validate: true,
        returning: true,
        transaction: transaction
      },
    );
    return vmainRel;
  } catch (error) {
    throw error;
  }
};

exports.findByFilter = async (filter, populate = false) => {
  try {
    const vmainRel = await vmainRelModel.findOne({
      where: filter,
    });
    return vmainRel;
  } catch (error) {
    throw error;
  }
};

exports.getAll = async (filter) => {
  try {
    return await vmainRelModel.findAll({
      where: filter,
    });
  } catch (error) {
    throw error;
  }
};

exports.update = async (filter, dataForUpdate, transaction) => {
  try {
    const result = await vmainRelModel.update(
      dataForUpdate,
      { where: filter, returning: true, transaction: transaction },
    );
    if (result[0] === 0) {
      throw new Error(`No record found with EntryNo ${filter.EntryNo}.`);
    }
    return result[1];
  } catch (error) {
    throw error;
  }
};

exports.delete = async (filter, transaction) => {
  try {
    return await vmainRelModel.destroy({ where: filter, transaction: transaction});
  } catch (error) {
    throw error;
  }
};
