const { features_A_permission, features_master } = require('../../config/db');

const FeaturesMasterPermission = require('../../config/db').features_master_permission;


module.exports = {

    async create(featuresMasterPermissionData) {
        return await FeaturesMasterPermission.create(featuresMasterPermissionData);
    },

    async findAll() {
        return await FeaturesMasterPermission.findAll({
            include: [
                features_master,
                features_A_permission
            ],
        });
    },

    async findOne(id) {
        return await FeaturesMasterPermission.findByPk(id);
    },

    async update(id, featuresMasterPermissionData) {
        const featuresMasterPermission = await FeaturesMasterPermission.findByPk(id);
        if (!featuresMasterPermission) {
            throw new Error('Features master permission not found');
        }
        await featuresMasterPermission.update(featuresMasterPermissionData);
        return featuresMasterPermission;
    },


    async delete(id) {
        const featuresMasterPermission = await FeaturesMasterPermission.findByPk(id);
        if (!featuresMasterPermission) {
            throw new Error('Features master permission not found');
        }
        await featuresMasterPermission.destroy();
    }
};