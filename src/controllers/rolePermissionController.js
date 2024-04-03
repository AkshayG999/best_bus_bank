const featuresHelper = require("../helper/featuresHelper");
const rolePermissionHelper = require("../helper/rolePermissionHelper");
const featuresService = require("../services/featuresService");
const rolePermissionsService = require("../services/rolePermissionsService");




exports.createRolePermission = async (req, res) => {
    try {
        const { name, permissions } = req.body;

        const findRole = await rolePermissionsService.getAllRolesPermissions({ name: name });
        if (findRole.length > 0) {
            return res.status(400).json({ success: false, message: 'Role Name already exists' });
        }

        // let permissionsData = rolePermissionHelper.extractFeaturesC(permissions);

        // let filterPermissionsList = rolePermissionHelper.filterPermissions(permissionsData);

        // if (filterPermissionsList.length == 0) {
        //     return res.status(404).json({ success: false, message: 'Permissions not found! Please provide valid permissions' });
        // }

        let role = await rolePermissionsService.createRolePermissions(name);

        return res.status(200).send({ success: true, message: 'Permissions created successfully', result: role });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Internal server error', error });
    }
}


exports.getAllRolePermissions = async (req, res) => {
    try {

        const rolePermissions = await rolePermissionsService.getAllRolesPermissions({});
        if (!rolePermissions) {
            return res.status(404).send({ success: false, message: 'No role permissions found' });
        }
        return res.status(200).send({ success: true, message: 'Fetched successfully', result: rolePermissions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


exports.getRolePermissionById = async (req, res) => {
    const { id } = req.params;
    const { masterId } = req.body;

    try {
        const role = await rolePermissionsService.getRolesById(id);
        if (!role) {
            return res.status(404).send({ success: false, message: 'Role not found' });
        }

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

        let permissions;
        const featuresData = featuresHelper.featuresWithReadWrite(masterId, featuresList, level = 0);
        // console.log(featuresData);
        if (role.dataValues.permissions == null) {
            permissions = rolePermissionHelper.replaceReadWriteWithPermissions([], featuresData);

        } else {
            permissions = rolePermissionHelper.replaceReadWriteWithPermissions(role.dataValues.permissions, featuresData);
        }


        return res.status(200).send({ success: true, message: 'Fetched successfully', result: permissions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



exports.updateRolePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const { permissions } = req.body;

        let permissionsData = rolePermissionHelper.extractFeaturesC(permissions);
        const role = await rolePermissionsService.getRolesById(id);
        // console.log(role);
        if (!role) {
            return res.status(404).send({ success: false, message: 'Role not found' });
        }

        const updatedPermissions = rolePermissionHelper.concatRolePermissions(role.dataValues, permissionsData);
        // console.log(updatedPermissions);
        let filterPermissionsList = rolePermissionHelper.filterPermissions(updatedPermissions.permissions);

        if (filterPermissionsList.length == 0) {
            return res.status(404).json({ success: false, message: 'No data for update' });
        }

        const rolePermissionUpdate = await rolePermissionsService.updateRolesPermissions(id, filterPermissionsList);

        return res.send({ success: true, message: 'Permissions updated successfully', result: rolePermissionUpdate });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error', error });
    }
}


exports.deleteRolePermission = async (req, res) => {
    const { id } = req.params;
    try {

        res.json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}