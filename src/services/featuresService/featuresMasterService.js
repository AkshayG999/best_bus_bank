const { features_master, features_A, features_B, features_C } = require("../../config/db");


async function getFeatureById(id) {
    const featuresMasterWithAssociations = await features_master.findByPk(id, {
        attributes: ["id", "name", "description"],

        include: [
            {
                model: features_A,
                as: 'features_A',
                attributes: ["id", "name", "description"],

                include: [
                    {
                        model: features_B,
                        as: 'features_B',
                        attributes: ["id", "name", "description"],

                        include: [
                            {
                                model: features_C,
                                as: 'features_C',
                                attributes: ["id", "name", "description"],

                            }
                        ]
                    },
                ]
            },
        ]
    });

    return featuresMasterWithAssociations;
}


async function getAllFeatures() {
    return await features_master.findAll({
        attributes: ["id", "name", "description"],
        include: [
            {
                model: features_A,
                as: 'features_A',
                attributes: ["id", "name", "description"],
                include: [
                    {
                        model: features_B,
                        as: 'features_B',
                        attributes: ["id", "name", "description"],

                        include: [
                            {
                                model: features_C,
                                as: 'features_C',
                                attributes: ["id", "name", "description"],

                            }
                        ]
                    },
                ]
            },
        ]
    });
}


async function createFeature(data) {
    return await features_master.create(data);
}

async function updateFeature(id, data) {
    const feature = await features_master.findByPk(id);
    if (!feature) {
        throw new Error('Feature not found');
    }
    return await feature.update(data);
}

async function deleteFeature(id) {
    const feature = await features_master.findByPk(id);
    if (!feature) {
        throw new Error('Feature not found');
    }
    return await feature.destroy();
}

module.exports = {
    getAllFeatures,
    getFeatureById,
    createFeature,
    updateFeature,
    deleteFeature,
};
