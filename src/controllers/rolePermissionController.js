const { featuresWithReadWrite } = require("../helper/featuresHelper");
const { extractFeaturesC, replaceReadWriteWithPermissions, concatRolePermissions, filterPermissions } = require("../helper/rolePermissionHelper");
const { getFilterFeatures } = require("../services/featuresService");
const { createRolePermissions, getAllRolesPermissions, getRolesById, updateRolesPermissions } = require("../services/rolePermissionsService");



exports.createRolePermission = async (req, res) => {
    try {
        const { name, permissions } = req.body;

        let permissionsData = extractFeaturesC(permissions);
        let filterPermissionsList = filterPermissions(permissionsData);

        let role = await createRolePermissions(name, filterPermissionsList);

        return res.status(200).send({ success: true, message: 'Permissions created successfully', role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

exports.getRolePermissionById = async (req, res) => {
    const { id } = req.params;
    const { masterId } = req.body;

    try {
        const role = await getRolesById(id);
        if (!role) {
            return res.status(404).json({ success: true, message: 'Role not found' });
        }

        let featuresList = await getFilterFeatures({});

        featuresList = featuresList.map(item => ({
            id: item.dataValues.id,
            name: item.dataValues.name,
            description: item.dataValues.description,
            parentFeatureId: item.dataValues.parentFeatureId,
        }));

        const featuresData = featuresWithReadWrite(masterId, featuresList, level = 0);
        // console.log(role);

        let permissions = replaceReadWriteWithPermissions(role.dataValues.permissions, featuresData);

        return res.status(200).send({ success: true, role: { id: role.id, name: role.name }, permissions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getAllRolePermissions = async (req, res) => {
    try {

        const rolePermissions = await getAllRolesPermissions();
        if (!rolePermissions) {
            return res.status(404).json({ message: 'No role permissions found' });
        }
        res.json(rolePermissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


exports.updateRolePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const { permissions } = req.body;

        let permissionsData = extractFeaturesC(permissions);
        const role = await getRolesById(id);
        // console.log(role);
        if (!role) {
            return res.status(404).json({ success: false, message: 'Role not found' });
        }

        const updatedPermissions = concatRolePermissions(role.dataValues, permissionsData);
        // console.log(updatedPermissions);
        let filterPermissionsList = filterPermissions(updatedPermissions.permissions);

        const rolePermissionUpdate = await updateRolesPermissions(id, filterPermissionsList);

        return res.send({ success: true, message: 'Permissions updated successfully', rolePermissionUpdate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


exports.deleteRolePermission = async (req, res) => {
    const { id } = req.params;
    try {
        const rolePermission = await updateRolePermissionById(id, req.body);
        if (!rolePermission) {
            return res.status(404).json({ message: 'Role Permission not found' });
        }
        res.json(rolePermission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}