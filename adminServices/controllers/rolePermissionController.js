const { errorMid, handleErrors } = require("../../middlewareServices/errorMid");
const userService = require("../../userServices/services/userService");
const featuresHelper = require("../helper/featuresHelper");
const rolePermissionHelper = require("../helper/rolePermissionHelper");
const featuresService = require("../services/featuresService");
const rolePermissionsService = require("../services/rolePermissionsService");
const { sequelize } = require("../../db/db");
const { Sequelize, Op } = require("sequelize");
const AuditLogRepository = require('../../auditServices/auditLogService');



exports.createRolePermission = async (req, res) => {
    const transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        const { name } = req.body;

        const findRole = await rolePermissionsService.getAllRolesPermissions({
            name: name,
        });
        if (findRole.length > 0) {
            return errorMid(
                400,
                `${name} already exists`,
                req,
                res
            );
        }

        let role = await rolePermissionsService.createRolePermissions(name, transaction);
        if (!role) {
            return errorMid(
                400,
                "Role creation failed",
                req,
                res
            );
        }
        await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "role_permissions",
            entityId: role.id,
            action: "CREATE",
            beforeAction: null,
            afterAction: role,
        }, transaction);

        await transaction.commit();

        return res
            .status(200)
            .send({
                success: true,
                message: "Role created successfully",
                result: role,
            });

    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error(error);
        return handleErrors(error, req, res);
    }
};

exports.getAllRolePermissions = async (req, res) => {
    try {
        const { roleId } = req.query;
        let filter = {};
        if (roleId) {
            filter.id = roleId;
        }
        // console.log(filter);
        const rolePermissions = await rolePermissionsService.getAllRolesPermissions(
            filter
        );
        if (!rolePermissions) {
            return errorMid(
                404,
                `No role permissions found`,
                req,
                res
            );
        }
        return res
            .status(200)
            .send({
                success: true,
                message: "Fetched successfully",
                result: rolePermissions,
            });
    } catch (error) {
        console.error(error);
        return handleErrors(error, req, res);
    }
};

exports.getRolePermissionById = async (req, res) => {
    const { id } = req.params;
    const { roleId, masterId } = req.query;

    try {
        const role = await rolePermissionsService.getRolesById(roleId);
        if (!role) {
            return errorMid(
                404,
                `No role found`,
                req,
                res
            );
        }

        const findFeature = await featuresService.getFeaturesById(masterId);
        if (!findFeature) {
            return errorMid(
                404,
                `No master feature found`,
                req,
                res
            );
        }

        let featuresList = await featuresService.getFilterFeatures({});

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

        let permissions;
        const featuresData = featuresHelper.featuresWithReadWrite(
            masterId,
            featuresList,
            (level = 0)
        );
        // console.log(featuresData);
        if (role.dataValues.permissions == null) {
            permissions = rolePermissionHelper.replaceReadWriteWithPermissions(
                [],
                featuresData
            );
        } else {
            permissions = rolePermissionHelper.replaceReadWriteWithPermissions(
                role.dataValues.permissions,
                featuresData
            );
        }

        return res
            .status(200)
            .send({
                success: true,
                message: "Fetched successfully",
                result: permissions,
            });
    } catch (error) {
        console.error(error);
        return handleErrors(error, req, res);
    }
};

exports.updateRolePermission = async (req, res) => {
    const transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        const { id } = req.params;
        const { permissions } = req.body;

        if (!permissions) {
            return errorMid(
                404,
                `Permissions data not found`,
                req,
                res
            );
        }

        const role = await rolePermissionsService.getRolesById(id);
        // console.log(role);
        if (!role) {
            return errorMid(404, "Role not found", req, res);
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


        let updatedPermissions;

        if (role.dataValues.permissions != null) {
            // compare and rewrite changes permissions
            updatedPermissions = rolePermissionHelper.concatRolePermissions(
                role.dataValues,
                concatRolePermissions
            );
            // console.log(updatedPermissions);

            //Filter out permissions where both read and write are false
            let filterPermissionsList = rolePermissionHelper.filterPermissions(
                updatedPermissions.permissions
            );

            if (filterPermissionsList.length == 0) {
                return errorMid(
                    404,
                    `No data for update`,
                    req,
                    res
                );
            }
            const rolePermissionUpdate =
                await rolePermissionsService.updateRolesPermissions(
                    id,
                    filterPermissionsList,
                    transaction
                );

            await AuditLogRepository.log({
                SystemID: req.systemID,
                entityName: "role_permissions",
                entityId: id,
                action: "UPDATE",
                beforeAction: role,
                afterAction: rolePermissionUpdate,
            }, transaction);

            await transaction.commit();

            return res.send({
                success: true,
                message: "Permissions updated successfully",
                result: rolePermissionUpdate,
            });
        } else {
            //Filter out permissions where both read and write are false
            let filterPermissionsList =
                rolePermissionHelper.filterPermissions(concatRolePermissions);

            if (filterPermissionsList.length == 0) {
                return errorMid(
                    404,
                    `No data for update`,
                    req,
                    res
                );
            }

            const rolePermissionUpdate =
                await rolePermissionsService.updateRolesPermissions(
                    id,
                    filterPermissionsList,
                    transaction
                );

            await AuditLogRepository.log({
                SystemID: req.systemID,
                entityName: "role_permissions",
                entityId: id,
                action: "UPDATE",
                beforeAction: role,
                afterAction: rolePermissionUpdate,
            }, transaction);

            await transaction.commit();
            return res.send({
                success: true,
                message: "Permissions updated successfully",
                result: rolePermissionUpdate,
            });
        }
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error(error);
        return handleErrors(error, req, res);
    }
};


exports.deleteRolePermission = async (req, res) => {
    const transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        const { id } = req.params;

        const role = await rolePermissionsService.getRolesById(id);
        if (!role) {
            return errorMid(404, "Role not found", req, res);
        }

        const deletedRole = await rolePermissionsService.deleteRolesPermissions(id, transaction);
        if (!deletedRole) {
            return errorMid(400, "Role not deleted", req, res);
        }

        await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "role_permissions",
            entityId: id,
            action: "DELETE",
            beforeAction: role,
            afterAction: null,
        }, transaction);

        await transaction.commit();

        return res.send({
            success: true,
            message: "Role deleted successfully",
            result: deletedRole,
        });

    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error(error);
        return handleErrors(error, req, res);
    }
};