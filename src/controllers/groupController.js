const groupService = require("../services/groupService");
const parentGroupService = require("../services/parentGroupService");
const { sequelize } = require("../../db/db");
const { Sequelize } = require("sequelize");
const { handleErrors, errorMid } = require("../../middlewareServices/errorMid");
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");




exports.createGroup = async (req, res) => {
    let transaction;
    try {
        let { groupName, parentGroupId } = req.body;
        const createdBy = req.systemID;

        const findParentGroup = await parentGroupService.findById(parentGroupId);

        transaction = await sequelize.transaction({ isolationLevel: Sequelize.Transaction.SERIALIZABLE });

        const tr_no = await procedureStoreController.generateGroupUniqueCode('group_tr_no', 'BR', transaction);

        const sr_no = await procedureStoreController.createRecordWithSrNo('group_sr_no', transaction);

        groupName = groupName.toUpperCase();
        const createNewGroup = await groupService.createGroup({ sr_no, tr_no, groupName, parentGroupId, createdBy }, transaction);

        await transaction.commit();

        return res.status(201).send({ success: true, message: "New Group created successfully", result: createNewGroup });

    } catch (error) {
        console.error('Error creating group:', error);
        if (transaction) {
            await transaction.rollback();
        }
        return handleErrors(error, req, res);
    }
};



exports.getGroups = async (req, res) => {

    try {
        const { sr_no, tr_no, parentGroupId } = req.query;
        let filter = {};

        if (sr_no) filter.sr_no = sr_no;

        if (tr_no) filter.tr_no = tr_no;
        
        if (parentGroupId) filter.parentGroupId = parentGroupId;

        const getAllGroups = await groupService.getAllGroups(filter);
        return res.status(200).send({ success: true, message: "Fetched successfully", result: getAllGroups });

    } catch (error) {
        console.log(error);
        return handleErrors(error, req, res);
    }
}

exports.updateGroup = async (req, res) => {

    try {
        const { sr_no } = req.params;
        let { groupName, parentGroupId, } = req.body;
        let dataForUpdate = {};

        if (groupName) {
            groupName = groupName.toUpperCase();
            dataForUpdate.groupName = groupName;
        }
        if (parentGroupId) {
            dataForUpdate.parentGroupId = parentGroupId;
        }
        if (!dataForUpdate) return errorMid(400, "Please provide valid data to update", req, res);

        const updatedGroup = await groupService.updateGroup(sr_no, dataForUpdate);
        return res.status(200).send({ success: true, message: "Group updated successfully", result: updatedGroup });

    } catch (error) {
        console.log(error);
        return handleErrors(error, req, res);
    }
}


exports.deleteGroup = async (req, res) => {

    try {
        const { sr_no } = req.params;

        const findGroup = await groupService.findByGrp_srNo(sr_no);

        if (!findGroup) {
            return errorMid(400, "Group Id is Incorrect", req, res);
        }
        const deletedGroup = await groupService.deleteGroup(sr_no);
        return res.status(200).send({ success: true, message: "Group deleted successfully", result: deletedGroup });

    } catch (error) {
        console.log(error);
        return handleErrors(error, req, res);
    }
}