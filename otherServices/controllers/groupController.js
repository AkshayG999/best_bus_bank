const groupService = require("../services/groupService");
const parentGroupService = require("../services/parentGroupService");
const { sequelize } = require("../../db/db");
const { Sequelize, Op } = require("sequelize");
const { handleErrors, errorMid } = require("../../middlewareServices/errorMid");
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");

exports.createGroup = async (req, res) => {
    let transaction;
    try {
        let { groupName, parentGroupSrNo } = req.body;
        const createdBy = req.systemID;

        if (!groupName) {
            return errorMid(400, "Group Name is required", req, res);
        }

        if (!parentGroupSrNo) {
            return errorMid(400, "Parent Group Sr No is required", req, res);
        }

        groupName = groupName.toUpperCase();
        const getGroup = await groupService.getAllGroups({ groupName });
        if (getGroup.length > 0) {
            return errorMid(400, `${groupName} Group already exists`, req, res);
        }

        const findParentGroup = await parentGroupService.findBySrNo(
            parentGroupSrNo
        );
        if (!findParentGroup)
            return errorMid(
                400,
                `Parent Group with parentGroupSrNo: ${parentGroupSrNo} not found`,
                req,
                res
            );

        transaction = await sequelize.transaction({
            isolationLevel: Sequelize.Transaction.SERIALIZABLE,
        });

        const tr_no = await procedureStoreController.generateGroupUniqueCode(
            "group_tr_no",
            "BR",
            transaction
        );

        const sr_no = await procedureStoreController.createRecordWithSrNo(
            "group_sr_no",
            transaction
        );

        const createNewGroup = await groupService.createGroup(
            { sr_no, tr_no, groupName, parentGroupSrNo, createdBy },
            transaction
        );

        await transaction.commit();

        return res.status(201).send({
            success: true,
            message: "New Group created successfully",
            result: createNewGroup,
        });
    } catch (error) {
        console.error("Error creating group:", error);
        if (transaction) {
            await transaction.rollback();
        }
        return handleErrors(error, req, res);
    }
};

exports.getGroups = async (req, res) => {
    try {
        const { sr_no, tr_no, groupName, parentGroupSrNo } = req.query;
        let filter = {};

        if (sr_no) filter.sr_no = sr_no;

        if (tr_no) filter.tr_no = tr_no;

        if (groupName) filter.groupName = { [Op.iLike]: `%${groupName}%` };

        if (parentGroupSrNo) filter.parentGroupSrNo = parentGroupSrNo;

        const getAllGroups = await groupService.getAllGroups(filter, true);
        return res.status(200).send({
            success: true,
            message: "Fetched successfully",
            result: getAllGroups,
        });
    } catch (error) {
        console.log(error);
        return handleErrors(error, req, res);
    }
};

exports.updateGroup = async (req, res) => {
    try {
        const { sr_no } = req.params;
        let { groupName, parentGroupSrNo } = req.body;
        let dataForUpdate = {};

        const findGroup = await groupService.findBySrNo(sr_no);
        if (!findGroup) {
            return errorMid(400, `Group with sr_no: ${sr_no} not found`, req, res);
        }

        if (groupName) {
            groupName = groupName.toUpperCase();
            const findGroup = await groupService.getAllGroups({ groupName });
            if (findGroup.length > 0)
                return errorMid(400, `${groupName} Group already exists`, req, res);
            dataForUpdate.groupName = groupName;
        }

        if (parentGroupSrNo) {
            const findParentGroup = await parentGroupService.findBySrNo(
                parentGroupSrNo
            );
            if (!findParentGroup)
                return errorMid(
                    400,
                    `Parent Group with parentGroupSrNo: ${parentGroupSrNo} not found`,
                    req,
                    res
                );
            dataForUpdate.parentGroupSrNo = parentGroupSrNo;
        }

        if (!dataForUpdate)
            return errorMid(400, "Please provide valid data to update", req, res);

        const updatedGroup = await groupService.updateGroup(sr_no, dataForUpdate);
        return res.status(200).send({
            success: true,
            message: "Group updated successfully",
            result: updatedGroup,
        });
    } catch (error) {
        console.log(error);
        return handleErrors(error, req, res);
    }
};

exports.deleteGroup = async (req, res) => {
    try {
        const { sr_no } = req.params;

        const findGroup = await groupService.findBySrNo(sr_no);
        if (!findGroup) {
            if (!findParentGroup)
                return errorMid(400, `Group with sr_no: ${sr_no} not found`, req, res);
        }
        const deletedGroup = await groupService.deleteGroup(sr_no);
        return res.status(200).send({
            success: true,
            message: "Group deleted successfully",
            result: deletedGroup,
        });
    } catch (error) {
        console.log(error);
        return handleErrors(error, req, res);
    }
};
