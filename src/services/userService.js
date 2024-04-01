const { db, sequelize, userModel, branchModel, departmentModel } = require("../config/db");



const getAll = async () => {
  return await userModel.findAll({ include: [{ model: branchModel, as: 'branch' }, { model: departmentModel, as: 'department' }] });
};

const findPersonBySystemID = async (systemID) => {
  return await userModel.findOne({
    where: {
      systemID: systemID
    }
  });
};

const findPersonByEmail = async (email) => {
  return await userModel.findOne({
    where: {
      email: email
    }
  });
};

const createPerson = async ({ name, email, password, systemID }) => {
  const newPerson = await userModel.create({ name, email, password, systemID });
  return newPerson;
};

const updatePerson = async ({ Id, Name, Email }) => {
  await userModel.update(
    { Name, Email },
    {
      where: {
        Id: Id,
      },
    }
  );
  return { Id, Name, Email };
};

const updatePersonRole = async (systemID, roleId, permissionsData) => {
  let user = await userModel.findOne({
    where: {
      systemID: systemID
    }
  });
  if (user) {
    return await user.update({ roleId: roleId, permissions: permissionsData });
    // return { success: true, message: 'Permissions updated successfully' };
  } else {
    return { success: false, message: 'User not found' };
  }

};

const updateDepartmentAllocation = async (systemID, bankId, branchId, departmentId, role) => {
  return await userModel.update(
    { bankId, branchId, departmentId, role },
    {
      where: {
        systemID: systemID,
      },
    }
  );
  { systemID, role };
};

const deletePerson = async (Id) => {
  await userModel.destroy({
    where: { Id: Id },
  });
};

module.exports = {
  getAll,
  findPersonBySystemID,
  findPersonByEmail,
  createPerson,
  updatePerson,
  updatePersonRole,
  updateDepartmentAllocation,
  deletePerson,
};
