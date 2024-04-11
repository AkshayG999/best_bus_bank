const { errorMid, handleErrors } = require("../../middlewareServices/errorMid");
const parentGroupService = require("../services/parentGroupService");
const { sequelize } = require("../../db/db");
const { Sequelize } = require("sequelize");
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");


const createParentGroup = async (req, res) => {
    let transaction;
    try {
        const { name } = req.body;
        if (!name) {
            return errorMid(400, 'Name is required', req, res);
        }
        transaction = await sequelize.transaction({ isolationLevel: Sequelize.Transaction.SERIALIZABLE });
        const sr_no = await procedureStoreController.createRecordWithSrNo('parent_group_sr_no', transaction);

        const createNewParentGroup = await parentGroupService.createParentGroup({ sr_no, name }, transaction)
        await transaction.commit();

        return res.status(201).send({ success: true, message: 'Parent group created successfully', result: createNewParentGroup });

    } catch (error) {
        console.log(error);
        if (transaction) {
            await transaction.rollback();
        }
        return handleErrors(error, req, res);
    }
}


const getAllParentGroups = async (req, res) => {

    try {

        const getAllGroups = await parentGroupService.getAll();
        return res.status(200).json(getAllGroups);

    } catch (error) {
        console.log(error);
        return handleErrors(error, req, res);
    }
}


module.exports = { createParentGroup, getAllParentGroups };