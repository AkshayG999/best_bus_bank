const features_C_permission = require('../../config/db').features_C_permission;


module.exports = {

    async create(features_C_permissionData) {
        return await features_C_permission.create(features_C_permissionData);
    },

    async findAll() {
        return await features_C_permission.findAll();
    },

    async findOne(id) {
        return await features_C_permission.findByPk(id);
    },

    async update(id, features_C_permissionData) {
        const features_C_permission = await features_C_permission.findByPk(id);
        if (!features_C_permission) {
            throw new Error('features_C_permission not found');
        }
        await features_C_permission.update(features_C_permissionData);
        return features_C_permissionData;
    },


    async delete(id) {
        const features_C_permissionData = await features_C_permission.findByPk(id);
        if (!features_C_permissionData) {
            throw new Error('features_C_permission not found');
        }
        await features_C_permissionData.destroy();
    }
};