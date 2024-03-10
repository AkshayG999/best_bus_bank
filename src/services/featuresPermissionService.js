const { features_permission } = require("../config/db");

async function createPermission(userId, permissions) {
    return await features_permission.create({ userId, permissions });
}

async function getPermission(userId) {
    return await features_permission.findOne({ where: { userId } });
}

async function updatePermission(userId, permissions) {
    return await features_permission.update({ permissions }, { where: { userId } });
}

async function deletePermission(userId) {
    return await features_permission.destroy({ where: { userId } });
}

module.exports = {
    createPermission,
    getPermission,
    updatePermission,
    deletePermission
};
