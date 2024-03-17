const features_A_permission = require('../../config/db').features_A_permission;


module.exports = {

    async create(features_A_permissionData) {
        return await features_A_permission.create(features_A_permissionData);
    },

    async findAll() {
        return await features_A_permission.findAll();
    },

    async findOne(id) {
        return await features_A_permission.findByPk(id);
    },

    async update(id, features_A_permissionData) {
        const features_A_permission = await features_A_permission.findByPk(id);
        if (!features_A_permission) {
            throw new Error('Features_A_permission not found');
        }
        await features_A_permission.update(features_A_permissionData);
        return features_A_permissionData;
    },


    async delete(id) {
        const features_A_permissionData = await features_A_permission.findByPk(id);
        if (!features_A_permissionData) {
            throw new Error('Features_A_permission not found');
        }
        await features_A_permissionData.destroy();
    }
};