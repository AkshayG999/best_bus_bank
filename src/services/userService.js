const { db, sequelize, userModel } = require("../config/db");



const getAll = async () => {
  return await userModel.findAll();
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
  deletePerson,
};
