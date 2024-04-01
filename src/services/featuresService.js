const { features } = require("../config/db");



async function getAllFeatures() {
    return await features.findAll();
}
async function getFilterFeatures(filter) {
    return await features.findAll({
        where: filter
    });
}

async function getFeaturesById(id) {
    return await features.findByPk(id);
}

async function createFeatures(data) {
    return await features.create(data);
}

// async function createFeatures(dataArray) {
//     const creationPromises = dataArray.map(data => features.create(data));
//     return await Promise.all(creationPromises);
// }

async function updateFeatures(id, parentFeatureId) {
    const feature = await features.findByPk(id);
    if (!feature) {
        throw new Error('Feature C not found');
    }
    return await feature.update({ parentFeatureId: parentFeatureId });
}

async function deleteFeatures(id) {
    const feature = await features.findByPk(id);
    if (!feature) {
        throw new Error('Feature C not found');
    }
    return await feature.destroy();
}

module.exports = {
    getAllFeatures,
    getFeaturesById,
    createFeatures,
    updateFeatures,
    deleteFeatures,
    getFilterFeatures
};
