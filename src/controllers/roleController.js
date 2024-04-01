const roleService = require('../services/roleService');
const { features_master, features_A, features_B, features_C, features_master_permission, features_A_permission, features_B_permission, features_C_permission } = require('../config/db');
const personService = require('../services/userService');


async function createRole(req, res) {
    try {
        const { roleName } = req.body;
        const findRole = await roleService.getRoleByName(roleName);
        console.log({ findRole })

        if (findRole.length > 0) {
            return res.status(400).json({ error: 'Role already exists' });
        }

        const role = await roleService.createRole(roleName.toUpperCase());

        if (!role) {
            return res.status(500).json({ error: 'Failed to create role' });
        }
        const rolePermission = await assignInitialPermissionsToRole(role.id);

        return res.status(201).json(role);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const assigninitialPermissionsToUser = async (req, res) => {
    try {
        const { userSystemID } = req.body;
        if (!userSystemID) {
            return res.status(400).json({ error: 'User System ID is required' });
        }
        const findUser = await personService.findPersonBySystemID(userSystemID);

        if (!findUser) {
            return res
                .status(404)
                .json({ statusCode: 404, error: "User Does not exist" });
        }

        const rolePermission = await assignPermissionsToUser(userSystemID);

        return res.status(201).json(rolePermission);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const roleAssignToUser = async (req, res) => {
    try {
        const { roleId, userSystemID } = req.body;

        const rolePermission = await assignPermissionsRoleToUser(roleId, userSystemID);

        return res.status(201).json(rolePermission);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createInitialPermissions = async (req, res) => {
    try {
        const { userSystemID } = req.body;
        const rolePermission = await assignInitialPermissionsToRole(userSystemID);
        return res.status(201).json(rolePermission);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


async function assignPermissionsRoleToUser(roleId, userSystemID) {
    try {

        // Create permission records for each feature
        const permissionsPromises = [];

        // Function to create permission record and add to permissionsPromises array
        async function updatePermissionRecord(Model, userSystemID, roleId, read, write, featureColumnName, featureId) {
            const record = {
                read: read,
                write: write,
                roleId: roleId,
            };

            console.log({ record });
            await Model.update(record,
                {
                    where: {
                        userSystemID: userSystemID, [featureColumnName]: featureId
                    },
                }
            )
        }


        // ____________Feature Master Permissions For User through role____________
        const roleMasterPermissions = await features_master_permission.findAll({ where: { roleId: roleId } });

        roleMasterPermissions.forEach(async masterPermission => await updatePermissionRecord(
            features_master_permission,
            userSystemID,
            masterPermission.roleId,
            masterPermission.read,
            masterPermission.write,
            'featuresMasterId',
            masterPermission.featuresMasterId
        ));


        // ____________Feature A Permissions For User through role____________
        const roleFeature_A_Permissions = await features_A_permission.findAll({ where: { roleId: roleId } });

        roleFeature_A_Permissions.forEach(async feature_A_Permission => await updatePermissionRecord(
            features_A_permission,
            userSystemID,
            feature_A_Permission.roleId,
            feature_A_Permission.read,
            feature_A_Permission.write,
            'featuresAId',
            feature_A_Permission.featuresAId
        ));


        // ____________Feature B Permissions For User through role____________
        const roleFeature_B_Permissions = await features_B_permission.findAll({ where: { roleId: roleId } });

        roleFeature_B_Permissions.forEach(async feature_B_Permission => await updatePermissionRecord(
            features_B_permission,
            userSystemID,
            feature_B_Permission.roleId,
            feature_B_Permission.read,
            feature_B_Permission.write,
            'featuresBId',
            feature_B_Permission.featuresBId
        ));


        // ____________Feature B Permissions For User through role____________
        const roleFeature_C_Permissions = await features_C_permission.findAll({ where: { roleId: roleId } });

        roleFeature_C_Permissions.forEach(async feature_C_Permission => await updatePermissionRecord(
            features_C_permission,
            userSystemID,
            feature_C_Permission.roleId,
            feature_C_Permission.read,
            feature_C_Permission.write,
            'featuresCId',
            feature_C_Permission.featuresCId
        ));


        // Wait for all permission records to be created and saved
        let result = await Promise.all(permissionsPromises);

        console.log('Initial permissions assigned to user successfully.');
        return result;
    } catch (error) {
        console.error('Error assigning initial permissions:', error);
    }
}


async function assignInitialPermissionsToRole(roleId) {
    try {
        // Create permission records for each feature
        const permissionsPromises = [];

        // Function to create permission record and add to permissionsPromises array
        async function createPermissionRecord(Model, featureColumnName, featureId, featurePermissionColumnName = null, featurePermissionId = null) {
            const record = {
                [featureColumnName]: featureId,
                [featurePermissionColumnName]: featurePermissionId,
                roleId: roleId
            };
            permissionsPromises.push(await Model.create(record));
        }

        const featuresMaster = await features_master.findAll();
        featuresMaster.forEach(async feature => await createPermissionRecord(features_master_permission, 'featuresMasterId', feature.id));

        const featuresA = await features_A.findAll();
        const featuresMasterPermissions = await features_master_permission.findAll({ where: { roleId: roleId } });

        featuresA.forEach(async (featureA) => {
            const matchingPermission = featuresMasterPermissions.find(permission => permission.featuresMasterId === featureA.featuresMasterId);
            if (matchingPermission) {
                await createPermissionRecord(features_A_permission, 'featuresAId', featureA.id, 'featuresMasterPermissionId', matchingPermission.id);
            } else {
                console.error(`No permission found for featuresAId: ${featureA.id}`);
            }
        });

        const featuresB = await features_B.findAll();
        const features_A_permissions = await features_A_permission.findAll({ where: { roleId: roleId } });

        featuresB.forEach(async (featureB) => {
            const matchingPermission = features_A_permissions.find(features_A_permission => features_A_permission.featuresAId === featureB.featuresAId);
            if (matchingPermission) {
                await createPermissionRecord(features_B_permission, 'featuresBId', featureB.id, 'featuresAPermissionId', matchingPermission.id);
            } else {
                console.error(`No permission found for featuresBId: ${featureB.id}`);
            }
        });

        const featuresC = await features_C.findAll();
        const features_B_permissions = await features_B_permission.findAll({ where: { roleId: roleId } });

        featuresC.forEach(async (featureC) => {
            const matchingPermission = features_B_permissions.find(features_B_permission => features_B_permission.featuresBId === featureC.featuresBId);
            if (matchingPermission) {
                await createPermissionRecord(features_C_permission, 'featuresCId', featureC.id, 'featuresBPermissionId', matchingPermission.id);
            } else {
                console.error(`No permission found for featuresCId: ${featureC.id}`);
            }
        });

        // Wait for all permission records to be created and saved
        let result = await Promise.all(permissionsPromises);

        console.log('Initial permissions assigned to role successfully.');
        return result;
    } catch (error) {
        console.error('Error assigning initial permissions:', error);
    }
}

async function assignPermissionsToUser(userSystemID) {
    try {

        // Create permission records for each feature
        const permissionsPromises = [];

        // Function to create permission record and add to permissionsPromises array
        async function createPermissionRecord(Model, featureCoumnName, featureId, featurePermissionColumnName = null, featurePermissionId = null) {
            permissionsPromises.push(await Model.create({ [featureCoumnName]: featureId, [featurePermissionColumnName]: featurePermissionId, userSystemID }));
        }


        const featuresMaster = await features_master.findAll();
        featuresMaster.forEach(async feature => await createPermissionRecord(features_master_permission, 'featuresMasterId', feature.id));

        const featuresA = await features_A.findAll();
        const featuresMasterPermissions = await features_master_permission.findAll({ where: { userSystemID: userSystemID } });

        featuresA.forEach(async (featureA) => {
            const matchingPermission = featuresMasterPermissions.find(permission => permission.featuresMasterId === featureA.featuresMasterId);
            if (matchingPermission) {
                await createPermissionRecord(features_A_permission, 'featuresAId', featureA.id, 'featuresMasterPermissionId', matchingPermission.id);
            } else {
                console.error(`No permission found for featuresAId: ${featureA.id}`);
            }
        });

        const featuresB = await features_B.findAll();
        const features_A_permissions = await features_A_permission.findAll({ where: { userSystemID: userSystemID } });

        featuresB.forEach(async (featureB) => {
            const matchingPermission = features_A_permissions.find(features_A_permission => features_A_permission.featuresAId === featureB.featuresAId);
            if (matchingPermission) {
                await createPermissionRecord(features_B_permission, 'featuresBId', featureB.id, 'featuresAPermissionId', matchingPermission.id);
            } else {
                console.error(`No permission found for featuresBId: ${featureB.id}`);
            }
        });

        const featuresC = await features_C.findAll();
        const features_B_permissions = await features_B_permission.findAll({ where: { userSystemID: userSystemID } });

        featuresC.forEach(async (featureC) => {
            const matchingPermission = features_B_permissions.find(features_B_permission => features_B_permission.featuresBId === featureC.featuresBId);
            if (matchingPermission) {
                await createPermissionRecord(features_C_permission, 'featuresCId', featureC.id, 'featuresBPermissionId', matchingPermission.id);
            } else {
                console.error(`No permission found for featuresCId: ${featureC.id}`);
            }
        });

        // Wait for all permission records to be created and saved
        let result = await Promise.all(permissionsPromises);

        console.log('Initial permissions assigned to user successfully.');
        return result;
    } catch (error) {
        console.error('Error assigning initial permissions:', error);
    }
}

async function getRoles(req, res) {
    try {
        const roles = await roleService.getAllRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getRoleById(req, res) {
    try {
        const role = await roleService.getRoleById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateRole(req, res) {
    try {
        const updatedRole = await roleService.updateRole(req.params.id, req.body);
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteRole(req, res) {
    try {
        await roleService.deleteRole(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createRole,
    assigninitialPermissionsToUser,
    roleAssignToUser,
    getRoles,
    createInitialPermissions,
    getRoleById,
    updateRole,
    deleteRole
};

