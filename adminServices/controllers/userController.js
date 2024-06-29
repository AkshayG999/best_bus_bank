const bcrypt = require('bcrypt');
const userService = require("../../userServices/services/userService");
const generator = require('generate-password');
const ShortUniqueId = require('short-unique-id');
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
