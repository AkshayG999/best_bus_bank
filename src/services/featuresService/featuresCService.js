const { features_C } = require("../../config/db");


async function getAllFeaturesC() {
    return await features_C.findAll();
}

async function getFeatureCById(id) {
    return await features_C.findByPk(id);
}

async function createFeatureC(data) {
    return await features_C.create(data);
}

async function updateFeatureC(id, data) {
    const feature = await features_C.findByPk(id);
    if (!feature) {
        throw new Error('Feature C not found');
    }
    return await feature.update(data);
}

async function deleteFeatureC(id) {
    const feature = await features_C.findByPk(id);
    if (!feature) {
        throw new Error('Feature C not found');
    }
    return await feature.destroy();
}

module.exports = {
    getAllFeaturesC,
    getFeatureCById,
    createFeatureC,
    updateFeatureC,
    deleteFeatureC
};
