const userService = require("../../userServices/services/userService");
const rolePermissionsService = require('../../adminServices/services/rolePermissionsService');
const rolePermissionHelper = require('../../adminServices/helper/rolePermissionHelper');
const featuresService = require('../../adminServices/services/featuresService');
const featuresHelper = require('../../adminServices/helper/featuresHelper');
const { errorMid, handleErrors } = require("../../middlewareServices/errorMid");
const { sequelize } = require("../../db/db");
const { Sequelize, Op } = require("sequelize");
const AuditLogRepository = require('../../auditServices/auditLogService');



exports.addRolePermissionsToUser = async (req, res) => {
    const transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        const { systemID } = req.params;
        const { roleId } = req.body;

        const user = await userService.findPersonBySystemID(systemID);

        if (!user) {
            return errorMid(404, "User Does not exist", req, res);
        }

        const role = await rolePermissionsService.getRolesById(roleId);

        if (!role) {
            return errorMid(404, "Role Does not exist", req, res);
        }

        let dataForUpdate = { roleId, permissions: role.dataValues.permissions }

        const userPermissions = await userService.updatePersonRole(systemID, dataForUpdate, transaction);

        if (!userPermissions) {
            return errorMid(404, "User Permissions Does not exist", req, res);
        }
        await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "user",
            entityId: user.systemID,
            action: "CREATE",
            beforeAction: user,
            afterAction: userPermissions,
        }, transaction);

        await transaction.commit();
        console.log(userPermissions, user.dataValues, role.dataValues);

        return res.status(200).send({ success: true, message: "Permission Added successfully", result: userPermissions })

    } catch (err) {
        if (transaction) {
            await transaction.rollback();
        }
        console.log({ err });
        return handleErrors(err, req, res);
    }
}


exports.fetchUserPermissions = async (req, res) => {
    try {
        const { systemID } = req.params;
        const { masterId } = req.query;

        const user = await userService.findPersonBySystemID(systemID);
        if (!user) {
            return errorMid(404, "User Does not exist", req, res);
        }
        // console.log(user.dataValues.permissions);

        if (masterId) {
            const findFeature = await featuresService.getFeaturesById(masterId);
            if (!findFeature) {
                return errorMid(404, 'Master feature not found', req, res);
            }
        }

        let userPermissions = user.dataValues.permissions;
        if (user.dataValues.roleId != null) {
            const role = await rolePermissionsService.getRolesById(user.dataValues.roleId);
            if (!role) {
                return errorMid(404, "Role Does not exist", req, res);
            }
            userPermissions = role.dataValues.permissions;
        }
        let featuresList = await featuresService.getFilterFeatures({});

        featuresList = featuresList.map(item => ({
            id: item.dataValues.id,
            name: item.dataValues.name,
            description: item.dataValues.description,
            parentFeatureId: item.dataValues.parentFeatureId,
        }));

        const featuresData = featuresHelper.featuresWithReadWrite(masterId || '', featuresList, level = 0);

        let permissions;
        if (userPermissions == null) {
            permissions = rolePermissionHelper.replaceReadWriteWithPermissions([], featuresData);
        } else {
            permissions = rolePermissionHelper.replaceReadWriteWithPermissions(userPermissions, featuresData);
        }

        return res.status(200).send({ success: true, message: "Permissions fetched successfully", result: permissions })

    } catch (err) {
        console.log({ err });
        return handleErrors(err, req, res);
    }
}


exports.fetchUserPermissionsAll = async (req, res) => {
    try {
        const { systemID } = req.params;

        const user = await userService.findPersonBySystemID(systemID);
        if (!user) {
            return errorMid(404, "User Does not exist", req, res);
        }

        let userPermissions = user.dataValues.permissions;
        if (user.dataValues.roleId != null) {
            const role = await rolePermissionsService.getRolesById(user.dataValues.roleId);
            if (!role) {
                return errorMid(404, "Role Does not exist", req, res);
            }
            userPermissions = role.dataValues.permissions;
        }

        let filter = {};
        filter.parentFeatureId = null;

        const featureAList = await featuresService.getFilterFeatures(filter);
        // console.log(featureAList);

        let result = [];

        if (featureAList.length == 0) {
            return errorMid(404, `features not found`, req, res);
        }

        for (let feature of featureAList) {

            // console.log(feature.dataValues);
            let masterId = feature.dataValues.id;

            let featuresList = await featuresService.getFilterFeatures({});
            // console.log(featuresList)

            featuresList = featuresList.map(item => ({
                id: item.dataValues.id,
                // name: item.dataValues.name,
                label: item.dataValues.label || item.dataValues.name,
                icon: item.dataValues.icon,
                link: item.dataValues.link,
                // description: item.dataValues.description,
                parentFeatureId: item.dataValues.parentFeatureId,
                parentId: item.dataValues.parentId,
            }));

            const featuresData = featuresHelper.featuresReadWriteWithChildItem(masterId || '', featuresList, level = 0);

            let permissions;
            if (userPermissions == null) {
                permissions = rolePermissionHelper.replaceReadWriteWithPermissions([], featuresData);
            } else {
                permissions = rolePermissionHelper.replaceReadWriteWithPermissions(userPermissions, featuresData);
            }
            const filterAndModifiedFeatures = featuresHelper.filterAndModify(permissions);

            if (filterAndModifiedFeatures != null) {
                result.push(filterAndModifiedFeatures)
            }
        }

        return res.status(200).send({ success: true, message: "Permissions fetched successfully", result: result })

    } catch (err) {
        console.log({ err });
        return handleErrors(err, req, res);
    }
}

exports.updateUserPermissions = async (req, res) => {
    const transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        const { systemID } = req.params;
        const { permissions } = req.body;

        const user = await userService.findPersonBySystemID(systemID);
        if (!user) {
            return errorMid(404, "User Does not exist", req, res);
        }
        if (!permissions) {
            return errorMid(404, `Permissions data not found`, req, res);
        }
        // // Extracting permissions from last child
        // let lastChildExtracted = rolePermissionHelper.extractLastChildPermissions(permissions);

        if (user.dataValues.permissions == null) {
            user.dataValues.permissions = [];
        }

        // ___________________________________________________________________________________________________________________________________

        const masterId = permissions.id;
        // console.log(masterId);

        let featuresList = await featuresService.getFilterFeatures({});
        if (featuresList.length == 0) {
            return errorMid(
                404,
                `features not found`,
                req,
                res
            );
        }
        featuresList = featuresList.map((item) => ({
            id: item.dataValues.id,
            name: item.dataValues.name,
            label: item.dataValues.label,
            icon: item.dataValues.icon,
            link: item.dataValues.link,
            description: item.dataValues.description,
            parentFeatureId: item.dataValues.parentFeatureId,
            parentId: item.dataValues.parentId,
        }));
        // console.log(featuresList);

        const result = featuresHelper.featuresWithReadWrite(masterId, featuresList, (level = 0));

        let originalExtractedLastChild = rolePermissionHelper.extractLastChildPermissions(result);

        let permissionsLastChildExtracted = rolePermissionHelper.extractLastChildPermissions(permissions);

        let concatRolePermissions = rolePermissionHelper.concatOriginalFeatures(originalExtractedLastChild, permissionsLastChildExtracted);

        // ______________________________________________________________________________________________________________________________________________________________


        const concatPermissions = rolePermissionHelper.concatRolePermissions(user.dataValues, concatRolePermissions);
        // console.log(concatPermissions);

        // const updatePermissions = rolePermissionHelper.replaceReadWriteWithPermissions(user.dataValues.permissions, concatPermissions.permissions);

        let filterPermissionsList = rolePermissionHelper.filterPermissions(concatPermissions.permissions);

        let dataForUpdate = { roleId: null, permissions: filterPermissionsList }

        const userPermissions = await userService.updatePersonRole(systemID, dataForUpdate, transaction);
        if (!userPermissions) {
            return errorMid(404, "User permissions not update", req, res);
        }

        await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "user",
            entityId: systemID,
            action: "UPDATE",
            beforeAction: user,
            afterAction: userPermissions
        }, transaction);

        await transaction.commit();

        return res.status(200).send({ status: true, message: "Permission updated successfully", result: userPermissions })
    }
    catch (err) {
        if (transaction) {
            await transaction.rollback();
        }
        console.log({ err });
        return handleErrors(err, req, res);
    }
}