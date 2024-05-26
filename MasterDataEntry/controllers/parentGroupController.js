const { errorMid, handleErrors } = require("../../middlewareServices/errorMid");
const parentGroupService = require("../services/parentGroupService");
const { sequelize } = require("../../db/db");
const { Sequelize, Op } = require("sequelize");
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");

exports.createParentGroup = async (req, res) => {
    let transaction;
    try {
        let { name } = req.body;
        if (!name) {
            return errorMid(400, "Name is required", req, res);
        }
        name = name.toUpperCase();
        const getGroup = await parentGroupService.getAll({ name });
        if (getGroup.length > 0) {
            return errorMid(400, `${name} Parent group already exists`, req, res);
        }

        transaction = await sequelize.transaction({
            isolationLevel: Sequelize.Transaction.SERIALIZABLE,
        });
        const sr_no = await procedureStoreController.createRecordWithSrNo(
            "parent_group_sr_no",
            transaction
        );

        const createNewParentGroup = await parentGroupService.createParentGroup(
            { sr_no, name },
            transaction
        );
        await transaction.commit();

        return res.status(201).send({
            success: true,
            message: "Parent group created successfully",
            result: createNewParentGroup,
        });
    } catch (error) {
        console.log(error);
        if (transaction) {
            await transaction.rollback();
        }
        return handleErrors(error, req, res);
    }
};


exports.getParentGroups = async (req, res) => {
    try {
        const { sr_no, name } = req.query;

        let filter = {};
        if (sr_no) filter.sr_no = sr_no;
        if (name) filter.name = { [Op.iLike]: `%${name}%` };

        const getAllGroups = await parentGroupService.getAll(filter);

        return res.status(200).json({
            success: true,
            message: "Fetched successfully",
            result: getAllGroups,
        });
    } catch (error) {
        console.log(error);
        return handleErrors(error, req, res);
    }
};


exports.updateParentGroup = async (req, res) => {
    try {
        const { sr_no } = req.params;
        let { name } = req.body;
        let dataForUpdate = {};

        const findGroup = await parentGroupService.findBySrNo(sr_no);
        if (!findGroup) {
            return errorMid(
                404,
                `Parent Group with sr_no: ${sr_no} not found`,
                req,
                res
            );
        }

        if (name) {
            name = name.toUpperCase();
            const getGroup = await parentGroupService.getAll({ name });
            if (getGroup.length > 0)
                return errorMid(400, `${name} Parent group already exists`, req, res);

            dataForUpdate.name = name;
        }

        if (!dataForUpdate)
            return errorMid(400, "Please provide valid data to update", req, res);

        const updatedGroup = await parentGroupService.updateParentGroup(
            sr_no,
            dataForUpdate
        );
        return res.status(200).send({
            success: true,
            message: "Parent group updated successfully",
            result: updatedGroup,
        });
    } catch (error) {
        console.log(error);
        return handleErrors(error, req, res);
    }
};

exports.deleteParentGroup = async (req, res) => {
    try {
        const { sr_no } = req.params;

        const findGroup = await parentGroupService.findBySrNo(sr_no);
        if (!findGroup) {
            return errorMid(
                404,
                `Parent Group with sr_no: ${sr_no} not found`,
                req,
                res
            );
        }

        const deletedGroup = await parentGroupService.deleteParentGroup(sr_no);
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
