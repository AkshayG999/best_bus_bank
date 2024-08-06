const {
  db,
  sequelize,
  userModel,
  branchModel,
  departmentModel,
  rolePermissions,
} = require("../../db/db");



exports.createPerson = async ({ name, email, password, systemID }) => {
  const newPerson = await userModel.create({ name, email, password, systemID });
  return newPerson;
};



exports.getAll = async (filter) => {
  return await userModel.findAll({
    where: filter,
    include: [
      { model: rolePermissions, as: 'role_permissions', attributes: ['id', 'name'] },
      //   { model: branchModel, as: "branch" },
      //   { model: departmentModel, as: "department" },
    ],
  });
};

exports.findPersonBySystemID = async (systemID) => {
  return await userModel.findOne({
    where: {
      systemID: systemID,
    },
  });
};

exports.findPersonByEmail = async (email) => {
  return await userModel.findOne({
    where: {
      email: email,
    },
  });
};

exports.updatePersonPassword = async (systemID, password) => {
  let user = await userModel.findOne({
    where: {
      systemID: systemID,
    },
  });
  if (user) {
    return await user.update({ password });
  }

}


exports.updateUser = async (systemID, dataForUpdate, transaction) => {
  try {
    const result = await userModel.update(dataForUpdate, {
      where: { systemID },
      returning: true,
    }, { transaction });

    if (result[0] === 0) {
      throw new Error(`No record found with systemID ${systemID}.`);
    }
    return result[1][0];
  } catch (error) {
    throw error;
  }
};

exports.updatePersonRole = async (systemID, dataForUpdate, transaction) => {
  try {
    const [updateCount, updatedRows] = await userModel.update(dataForUpdate, {
      where: { systemID }, returning: true,
      transaction,
    });
    if (updateCount === 0) {
      return null;
    }
    return updatedRows[0];
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.updateDepartmentAllocation = async (
  systemID,
  bankId,
  branchId,
  departmentId,
  role
) => {
  return await userModel.update(
    { bankId, branchId, departmentId, role },
    {
      where: {
        systemID: systemID,
      },
    }
  );
};

exports.deletePerson = async (systemID) => {
  await userModel.destroy({
    where: { systemID: systemID },
  });
};


