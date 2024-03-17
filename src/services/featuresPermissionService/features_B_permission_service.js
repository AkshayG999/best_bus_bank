const features_B_permission = require('../../config/db').features_B_permission;


module.exports = {

    async create(features_B_permissionData) {
        return await features_B_permission.create(features_B_permissionData);
    },

    async findAll() {
        return await features_B_permission.findAll();
    },

    async findOne(id) {
        return await features_B_permission.findByPk(id);
    },

    async update(id, features_B_permissionData) {
        const features_B_permission = await features_B_permission.findByPk(id);
        if (!features_B_permission) {
            throw new Error('features_B_permission not found');
        }
        await features_B_permission.update(features_B_permissionData);
        return features_B_permissionData;
    },


    async delete(id) {
        const features_B_permissionData = await features_B_permission.findByPk(id);
        if (!features_B_permissionData) {
            throw new Error('features_B_permission not found');
        }
        await features_B_permissionData.destroy();
    }
};