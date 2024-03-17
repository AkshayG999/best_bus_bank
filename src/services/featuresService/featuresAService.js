const { features_A, features_master, features_B, features_C } = require("../../config/db");

async function getAllFeaturesA() {
    return await features_A.findAll();
}

async function getFeatureAById(id) {
    // return await features_A.findByPk(id);
    const featuresBWithAssociations = await features_A.findOne({
        where: { id: id },
        include: [
            {
                model: features_B,
                as: 'features_B',
                include: [
                    {
                        model: features_C,
                        as: 'features_C'
                    }
                ]
            },

        ]
    });
    return featuresBWithAssociations;
}

async function createFeatureA(data) {
    return await features_A.create(data);
}

async function updateFeatureA(id, data) {
    const feature = await features_A.findByPk(id);
    if (!feature) {
        throw new Error('Feature A not found');
    }
    return await feature.update(data);
}

async function deleteFeatureA(id) {
    const feature = await features_A.findByPk(id);
    if (!feature) {
        throw new Error('Feature A not found');
    }
    return await feature.destroy();
}

module.exports = {
    getAllFeaturesA,
    getFeatureAById,
    createFeatureA,
    updateFeatureA,
    deleteFeatureA
};
