const { features_B, features_master, features_A, features_C } = require("../config/db");
const model = require("../models/userModel");


async function getAllFeaturesB() {
    return await features_B.findAll();
}

async function getFeatureBById(id) {
    return await features_B.findByPk(id, {
        include: [
            {
                model: features_C,
                as: 'features_C'
            }
        ]
    });
}

async function createFeatureB(data) {
    return await features_B.create(data);
}

async function updateFeatureB(id, data) {
    const feature = await features_B.findByPk(id);
    if (!feature) {
        throw new Error('Feature B not found');
    }
    return await feature.update(data);
}

async function deleteFeatureB(id) {
    const feature = await features_B.findByPk(id);
    if (!feature) {
        throw new Error('Feature B not found');
    }
    return await feature.destroy();
}

module.exports = {
    getAllFeaturesB,
    getFeatureBById,
    createFeatureB,
    updateFeatureB,
    deleteFeatureB
};
