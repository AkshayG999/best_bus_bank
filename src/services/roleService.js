const { roleModel } = require('../config/db');

async function createRole(roleName) {
    return await roleModel.create({ roleName });
}

async function getAllRoles() {
    return await roleModel.findAll();
}
async function getRoleByName(roleName) {
    return await roleModel.findAll({ where: { roleName: roleName } });
}

async function getRoleById(id) {
    return await roleModel.findByPk(id);
}

async function updateRole(id, roleName, accessibility) {
    const role = await roleModel.findByPk(id);
    if (!role) {
        throw new Error('Role not found');
    }
    role.roleName = roleName;
    role.accessibility = accessibility;
    await role.save();
    return role;
}

async function deleteRole(id) {
    const role = await roleModel.findByPk(id);
    if (!role) {
        throw new Error('Role not found');
    }
    await role.destroy();
}

module.exports = {
    createRole,
    getAllRoles,
    getRoleByName,
    getRoleById,
    updateRole,
    deleteRole
};
