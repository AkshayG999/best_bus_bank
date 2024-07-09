const shortId = require('shortid')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require("../services/userService");
const generator = require('generate-password');
const ShortUniqueId = require('short-unique-id');
const { generateUserFriendlyPassword } = require('../helper/helper');
const { errorMid, handleErrors } = require('../../middlewareServices/errorMid');
const { sequelize } = require("../../db/db");
const { Sequelize, Op } = require("sequelize");
const AuditLogRepository = require('../../auditServices/auditLogService');


exports.signUp = async (req, res) => {
  const transaction = await sequelize.transaction({
    isolationLevel: Sequelize.Transaction.SERIALIZABLE,
  });
  try {
    let { name, email, password } = req.body;

    if (!name) {
      return errorMid(400, "Name is required", req, res);
    }

    if (!email) {
      return errorMid(400, "Email is required", req, res);
    }

    // Check if user exists
    const existingUser = await userService.findPersonByEmail(email);
    if (existingUser) {
      return errorMid(409, "User already exists", req, res);
    }

    if (!password) {
      password = generator.generate({
        length: 10,
        numbers: true,
        excludeSimilarCharacters: true,
        // symbols: true
      });
      console.log("Auto Generated Password:", password);
    }

    // // Unique ID
    // const systemID = shortId.generate().toUpperCase();
    // console.log({ systemID });

    // Random UUID
    const { randomUUID } = new ShortUniqueId({ length: 10 });
    const systemID = randomUUID();
    console.log(systemID);

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createdPerson = await userService.createPerson({ name, email, password: hashedPassword, systemID });
    createdPerson['password'] = password;

    const log = await AuditLogRepository.log({
      SystemID: req.systemID,
      entityName: "user",
      entityId: createdPerson.systemID,
      action: "CREATE",
      beforeAction: null,
      afterAction: createdPerson,
    }, transaction);

    await transaction.commit();
    return res.status(201).json({ success: true, message: "User created successfully", result: createdPerson });

  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.log(error);
    return handleErrors(error, req, res);
  }
}


exports.getAll = async (req, res) => {
  try {
    const { systemID } = req.query;

    let filter = {};
    if (systemID) filter = { systemID: systemID };

    const users = await userService.getAll(filter);

    if (!users || users.length === 0) {
      return errorMid(404, "Users not found", req, res);
    }

    return res.status(200).json({ success: true, message: "Users fetched successfully", result: users });
  } catch (error) {
    console.log(error);
    return handleErrors(error, req, res);
  }
}



exports.updateUser = async (req, res) => {
  const transaction = await sequelize.transaction({
    isolationLevel: Sequelize.Transaction.SERIALIZABLE,
  });
  try {
    const { systemID } = req.params;
    const { name, email, password, bankId, branchId, departmentId } = req.body;

    const userIsExist = await userService.findPersonBySystemID(systemID);
    if (!userIsExist) {
      return errorMid(404, "User does not exist", req, res);
    }
    let dataForUpdate = {};

    if (name) dataForUpdate.name = name;

    if (email) {
      const existingUser = await userService.findPersonByEmail(email);
      if (existingUser && existingUser.systemID !== systemID) {
        return errorMid(409, "User already exists", req, res);
      }
      dataForUpdate.email = email
    }

    if (password) {
      const saltRounds = 10;
      dataForUpdate.password = await bcrypt.hash(password, saltRounds);
    }
    if (bankId) dataForUpdate.bankId = bankId;
    if (branchId) dataForUpdate.branchId = branchId;
    if (departmentId) dataForUpdate.departmentId = departmentId;

    if (!dataForUpdate) return errorMid(400, "Please provide valid data to update", req, res);

    const updatedPerson = await userService.updateUser(systemID, dataForUpdate);

    const log = await AuditLogRepository.log({
      SystemID: req.systemID,
      entityName: "user",
      entityId: updatedPerson.systemID,
      action: "UPDATE",
      beforeAction: userIsExist,
      afterAction: updatedPerson,
    }, transaction);

    await transaction.commit();
    return res.status(200).json({ success: true, message: "User updated successfully", result: updatedPerson });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    return handleErrors(error, req, res);
  }
}



exports.deleteByID = async (req, res) => {
  const transaction = await sequelize.transaction({
    isolationLevel: Sequelize.Transaction.SERIALIZABLE,
  });
  try {
    const { systemID } = req.params;

    const userIsExist = await userService.findPersonBySystemID(systemID);
    if (!userIsExist) {
      return errorMid(404, "User does not exist", req, res);
    }

    const deletedPerson = await userService.deletePerson(systemID);

    const log = await AuditLogRepository.log({
      SystemID: req.systemID,
      entityName: "user",
      entityId: deletedPerson.systemID,
      action: "DELETE",
      beforeAction: userIsExist,
      afterAction: null,
    }, transaction);

    await transaction.commit();
    return res.status(200).json({ success: true, message: "User deleted successfully", result: deletedPerson });

  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    return handleErrors(error, req, res);
  }
}



// ____________________________________________________________________________________________________________________________________
// User Side Routes
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await userService.findPersonByEmail(email);

    if (!user) {
      return errorMid(400, "Invalid email", req, res);
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return errorMid(400, "Invalid password", req, res);
    }

    // Generate JWT token
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ systemID: user.systemID, name: user.name, email, }, secretKey, { expiresIn: '2m' });//expiresIn: '4h'

    return res.status(200).json({ success: true, message: "User logged in successfully", systemID: user.systemID, token, user });

  } catch (error) {
    console.log(error);
    return handleErrors(error, req, res);
  }
}


exports.getBySystemID = async (req, res) => {
  try {
    const { systemID } = req.params;

    if (!systemID) {
      return errorMid(400, "systemID is required", req, res);
    }

    const user = await userService.findPersonBySystemID(systemID);
    if (!user) {
      return errorMid(404, "User does not exist", req, res);
    }

    return res.status(200).json({ success: true, message: "User found successfully", result: user });
  } catch (error) {
    return handleErrors(error, req, res);
  }
}


exports.updatePassword = async (req, res) => {
  const transaction = await sequelize.transaction({
    isolationLevel: Sequelize.Transaction.SERIALIZABLE,
  });
  try {
    const { systemID } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return errorMid(400, "Password is required", req, res);
    }

    const user = await userService.findPersonBySystemID(systemID);
    if (!user) {
      return errorMid(404, "User does not exist", req, res);
    }
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return errorMid(400, "Invalid current Password", req, res);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedPerson = await userService.updatePersonPassword(systemID, hashedPassword);

    await AuditLogRepository.log({
      SystemID: req.systemID,
      entityName: "user",
      entityId: updatedPerson.systemID,
      action: "UPDATE",
      beforeAction: user,
      afterAction: updatedPerson,
    }, transaction);

    await transaction.commit();

    return res.status(200).json({ success: true, message: "Password updated successfully", result: updatedPerson });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    return handleErrors(error, req, res);
  }
}
