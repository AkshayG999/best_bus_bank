const rolePermissions = require('../config/db').rolePermissions;



exports.createRolePermissions = async (name, permissions) => {
    try {
        return await rolePermissions.create({ name, permissions })
    }
    catch (err) {
        return err
    }
}

exports.getAllRolesPermissions = async (filter) => {
    try {
        return await rolePermissions.findAll({ where: filter })
    }
    catch (err) {
        return err
    }
}

exports.getRolesById = async (id) => {
    try {
        return await rolePermissions.findByPk(id, { attributes: ['id', 'name', 'permissions'] })
    }
    catch (err) {
        return err
    }
}

exports.updateRolesPermissions = async (id, updatedPermissions) => {
    try {
        const role = await rolePermissions.findByPk(id);
        if (role) {

            return await role.update({ permissions: updatedPermissions }, { attributes: ['id', 'name', 'permissions'] });
            // return { success: true, message: 'Permissions updated successfully' };
        } else {
            return { success: false, message: 'Role not found' };
        }

    } catch (error) {
        console.error('Error updating permissions:', error);
        return { success: false, message: 'An error occurred while updating permissions' };
    }
}

exports.deleteRolesPermissions = async (id) => {
    try {
        const role = await rolePermissions.findByPk(id);
        if (!feature) {
            throw new Error('Role not found');
        }
        return await role.destroy();
    }
    catch (err) {
        return err
    }
}



