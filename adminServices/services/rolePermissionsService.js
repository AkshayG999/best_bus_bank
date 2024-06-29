const rolePermissions = require('../../db/db').rolePermissions;



exports.createRolePermissions = async (name, transaction) => {
    try {
        return await rolePermissions.create({ name }, { transaction })
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

exports.updateRolesPermissions = async (id, updatedPermissions, transaction) => {
    try {
        const [updateCount, updatedRows] = await rolePermissions.update(
            { permissions: updatedPermissions },
            {
                where: { id },
                returning: true,
                transaction,
            }
        );
        if (updateCount === 0) {
            return null;
        }
        return updatedRows[0];
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



