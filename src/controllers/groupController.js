const groupService = require("../services/groupService");
const { findById } = require("../services/parentGroupService");
const { generateUniqueCode, createRecord } = require("../helper/helper");
const { generateGroupUniqueCode, createRecordWithSrNo, procedure_store_model } = require("../storeprocedures/groupStoreProcedure");
const { sequelize } = require("../../db/db");
const { Sequelize } = require("sequelize");




const createGroup = async (req, res) => {
    let transaction;
    try {
        let { groupName, parentGroupId } = req.body;
        const createdBy = req.systemID;

        const findParentGroup = await findById(parentGroupId);

        // Begin a transaction with SERIALIZABLE isolation level
        transaction = await sequelize.transaction({ isolationLevel: Sequelize.Transaction.SERIALIZABLE });

        // TRNo create function
        const tr_no = await generateGroupUniqueCode('group_tr_no', 'BR', transaction);

        // srNo
        const sr_no = await createRecordWithSrNo('group_sr_no', transaction);

        groupName = groupName.toUpperCase();
        const createNewGroup = await groupService.createGroup({ sr_no, tr_no, groupName, parentGroupId, createdBy }, transaction);

        // // Commit the transaction if all operations are successful
        // await transaction.commit();

        return res.status(201).send({ success: true, message: "New Group created successfully", result: createNewGroup });

    } catch (error) {
        console.error('Error creating group:', error);
        // Rollback the transaction if an error occurs
        // if (transaction) {
        //     await transaction.rollback();
        // }
        return res.status(500).json({ statusCode: 500, error: error.message });
    }
}



const getGroups = async (req, res) => {

    try {

        const getAllGroups = await groupService.getAllGroups();
        return res.status(200).send({ success: true, message: "Fetched successfully", result: getAllGroups });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ statusCode: 500, error: "Something went wrong" });
    }
}


module.exports = { createGroup, getGroups };