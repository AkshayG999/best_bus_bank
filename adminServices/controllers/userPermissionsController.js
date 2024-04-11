const userService = require("../../userServices/services/userService");

const rolePermissionsService = require('../../adminServices/services/rolePermissionsService');
const rolePermissionHelper = require('../../adminServices/helper/rolePermissionHelper');
const featuresService = require('../../adminServices/services/featuresService');
const featuresHelper = require('../../adminServices/helper/featuresHelper');



exports.addRolePermissionsToUser = async (req, res) => {
    try {
        const { systemID } = req.params;
        const { roleId } = req.body;

        const existingPerson = await userService.findPersonBySystemID(systemID);

        if (!existingPerson) {
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

        console.log(userPermissions, existingPerson.dataValues, role.dataValues)
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

        const existingPerson = await userService.findPersonBySystemID(systemID);

        if (!existingPerson) {
            return res
                .status(404)
                .json({ success: false, message: "User Does not exist" });
        }
        // console.log(existingPerson.dataValues.permissions);
        const findFeature = await featuresService.getFeaturesById(masterId);
        if (!findFeature) {
            return res.status(404).json({ success: false, message: 'Master feature not found' });
        }

        let featuresList = await featuresService.getFilterFeatures({});

        featuresList = featuresList.map(item => ({
            id: item.dataValues.id,
            name: item.dataValues.name,
            description: item.dataValues.description,
            parentFeatureId: item.dataValues.parentFeatureId,
        }));

        const featuresData = featuresHelper.featuresWithReadWrite(masterId, featuresList, level = 0);

        let permissions;
        if (existingPerson.dataValues.permissions == null) {
            permissions = rolePermissionHelper.replaceReadWriteWithPermissions([], featuresData);
        } else {
            permissions = rolePermissionHelper.replaceReadWriteWithPermissions(existingPerson.dataValues.permissions, featuresData);
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


exports.updateUserPermissions = async (req, res) => {
    try {
        const { systemID } = req.params;
        const { permissions } = req.body;

        const existingPerson = await userService.findPersonBySystemID(systemID);

        if (!existingPerson) {
            return res
                .status(404)
                .json({ success: false, message: "User Does not exist" });
        }

        // Extracting permissions from last child
        let lastChildExtracted = rolePermissionHelper.extractLastChildPermissions(permissions);

        if (existingPerson.dataValues.permissions == null) {
            existingPerson.dataValues.permissions = [];

        }
        const concatPermissions = rolePermissionHelper.concatRolePermissions(existingPerson.dataValues, lastChildExtracted);
        console.log(concatPermissions);

        const updatePermissions = rolePermissionHelper.replaceReadWriteWithPermissions(existingPerson.dataValues.permissions, concatPermissions.permissions);

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

