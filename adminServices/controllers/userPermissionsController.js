const userService = require("../../userServices/services/userService");
const rolePermissionsService = require('../../adminServices/services/rolePermissionsService');
const rolePermissionHelper = require('../../adminServices/helper/rolePermissionHelper');
const featuresService = require('../../adminServices/services/featuresService');
const featuresHelper = require('../../adminServices/helper/featuresHelper');
const { errorMid } = require("../../middlewareServices/errorMid");



exports.addRolePermissionsToUser = async (req, res) => {
    try {
        const { systemID } = req.params;
        const { roleId } = req.body;

        const user = await userService.findPersonBySystemID(systemID);

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User Does not exist" });
        }

        const role = await rolePermissionsService.getRolesById(roleId);

        if (!role) {
            return res
                .status(404)
                .json({ success: false, message: "Role Does not exist" });
        }

        let dataForUpdate = { roleId, permissions: role.dataValues.permissions }

        const userPermissions = await userService.updatePersonRole(systemID, dataForUpdate);

        console.log(userPermissions, user.dataValues, role.dataValues)
        return res.status(200).send({ success: true, message: "Permission Added successfully", result: userPermissions })

    } catch (err) {
        console.log({ err });
        return res.status(500).json({
            success: false,
            message: `Error:${err}`
        });
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
        return res.status(500).json({
            success: false,
            message: `Error:${err}`
        });
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
        return res.status(500).json({
            success: false,
            message: `Error:${err}`
        });
    }
}


exports.updateUserPermissions = async (req, res) => {
    try {
        const { systemID } = req.params;
        const { permissions } = req.body;

        const user = await userService.findPersonBySystemID(systemID);

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User Does not exist" });
        }

        // Extracting permissions from last child
        let lastChildExtracted = rolePermissionHelper.extractLastChildPermissions(permissions);

        if (user.dataValues.permissions == null) {
            user.dataValues.permissions = [];

        }
        const concatPermissions = rolePermissionHelper.concatRolePermissions(user.dataValues, lastChildExtracted);
        console.log(concatPermissions);

        const updatePermissions = rolePermissionHelper.replaceReadWriteWithPermissions(user.dataValues.permissions, concatPermissions.permissions);

        let filterPermissionsList = rolePermissionHelper.filterPermissions(updatePermissions);

        let dataForUpdate = { permissions: filterPermissionsList }

        const userPermissions = await userService.updatePersonRole(systemID, dataForUpdate);

        return res.status(200).send({ status: true, message: "Permission updated successfully", result: userPermissions })
    }
    catch (err) {
        console.log({ err });
        return res.status(500).json({
            success: false,
            message: `Error:${err}`
        })
    }
}