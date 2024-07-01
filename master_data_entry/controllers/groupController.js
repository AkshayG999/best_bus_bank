const groupService = require("../services/groupService");
const parentGroupService = require("../services/parentGroupService");
const { sequelize } = require("../../db/db");
const { Sequelize } = require("sequelize");
const { handleErrors, errorMid } = require("../../middlewareServices/errorMid");
const procedureStoreController = require("../../procedureStoreServices/controller/procedureStoreController");
const AuditLogRepository = require("../../auditServices/auditLogService");



exports.createGroup = async (req, res, next) => {
    const transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        let { GroupName, GroupUnder } = req.body;
        const createdBy = req.systemID;

        if (!GroupName) {
            return errorMid(400, "Group Name is required", req, res);
        }

        if (!GroupUnder) {
            return errorMid(400, "GroupUnder is required", req, res);
        }

        GroupName = GroupName.toUpperCase();
        const getGroup = await groupService.getAllGroups({ GroupName });
        if (getGroup.length > 0) {
            return errorMid(400, `${GroupName} Group already exists`, req, res);
        }

        const findParentGroup = await parentGroupService.findBySrNo(GroupUnder);
        if (!findParentGroup) {
            return errorMid(400, `Parent Group with GroupUnder No: ${GroupUnder} not found`, req, res);
        }

        const Grp_SrNo = await procedureStoreController.createRecordWithSrNo("group_Grp_SrNo", transaction);
        const TRNo = await procedureStoreController.generateGroupUniqueCode("group_TRNo", "BR", transaction);

        const createNewGroup = await groupService.createGroup(
            {
                Grp_SrNo, TRNo, GroupName, GroupUnder, GroupCode: "", Fox_GStatus: "",
                grp_prn_order: ""
            },
            transaction
        );
        if (!createNewGroup) {
            return next({ status: 400, message: "Group creation failed" });
        }

        const log = await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "group",
            entityId: Grp_SrNo,
            action: "CREATE",
            afterAction: createNewGroup,
        }, transaction);

        await transaction.commit();

        return res.status(201).send({
            success: true,
            message: "New Group created successfully",
            result: createNewGroup,
        });
    } catch (error) {
        console.error("Error creating group:", error);
        if (transaction && !transaction.finished) {
            try {
                await transaction.rollback();
            } catch (rollbackError) {
                console.error("Error rolling back transaction:", rollbackError);
            }
        }
        return handleErrors(error, req, res);
    }
};


exports.getGroups = async (req, res) => {
    try {
        const { Grp_SrNo, GroupName, GroupUnder } = req.query;
        let filter = {};

        if (Grp_SrNo) filter.Grp_SrNo = Grp_SrNo;

        if (GroupUnder) filter.GroupUnder = GroupUnder;

        if (GroupName) filter.GroupName = { [Op.iLike]: `%${GroupName}%` };

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

exports.updateGroup = async (req, res, next) => {
    const transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        const { Grp_SrNo } = req.params;
        let { GroupName, GroupUnder } = req.body;
        let dataForUpdate = {};

        const findGroup = await groupService.findBySrNo(Grp_SrNo);
        if (!findGroup) {
            return errorMid(400, `Group with Grp_SrNo: ${Grp_SrNo} not found`, req, res);
        }

        if (GroupName) {
            GroupName = GroupName.toUpperCase();
            const findGroup = await groupService.getAllGroups({ GroupName });
            if (findGroup.length > 0)
                return errorMid(400, `${GroupName} Group already exists`, req, res);
            dataForUpdate.GroupName = GroupName;
        }

        if (GroupUnder) {
            const findParentGroup = await parentGroupService.findBySrNo(GroupUnder);
            if (!findParentGroup)
                return errorMid(
                    400,
                    `Parent Group with GroupUnder: ${GroupUnder} not found`,
                    req,
                    res
                );
            dataForUpdate.GroupUnder = GroupUnder;
        }

        if (!dataForUpdate)
            return errorMid(400, "Please provide valid data to update", req, res);

        const updatedGroup = await groupService.updateGroup(Grp_SrNo, dataForUpdate, transaction);

        if (!updatedGroup[0]) {
            return next({ status: 400, message: "Group update failed" });
        }

        const log = await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "group",
            entityId: Grp_SrNo,
            action: "UPDATE",
            beforeAction: findGroup,
            afterAction: updatedGroup[0],
        }, transaction);

        await transaction.commit();
        return res.status(200).send({
            success: true,
            message: "Group updated successfully",
            result: updatedGroup[0],
        });
    } catch (error) {
        if (transaction && !transaction.finished) {
            try {
                await transaction.rollback();
            } catch (rollbackError) {
                console.error("Error rolling back transaction:", rollbackError);
            }
        }
        return next(error);
    }
};

exports.deleteGroup = async (req, res, next) => {
    const transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        const { Grp_SrNo } = req.params;

        const findGroup = await groupService.findBySrNo(Grp_SrNo);
        if (!findGroup) {
                return errorMid(400, `Group with Grp_SrNo: ${Grp_SrNo} not found`, req, res);
        }
        const deletedGroup = await groupService.deleteGroup(Grp_SrNo, transaction);
        if (!deletedGroup) {
            return next({ status: 400, message: "Group deletion failed" });
        }

        const log = await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "group",
            entityId: Grp_SrNo,
            action: "DELETE",
            beforeAction: findGroup,
            afterAction: null,
        }, transaction);

        await transaction.commit();
        return res.status(200).send({
            success: true,
            message: "Group deleted successfully",
            result: deletedGroup,
        });
    } catch (error) {
        if (transaction && !transaction.finished) {
            try {
                await transaction.rollback();
            } catch (rollbackError) {
                console.error("Error rolling back transaction:", rollbackError);
            }
        }
        return next(error);
    }
};
