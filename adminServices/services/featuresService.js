const { features } = require("../../db/db");


exports.getAllFeatures = async () => {
    return await features.findAll();
};

exports.getFilterFeatures = async (filter) => {
    try {
        return await features.findAll({
            where: filter,
            attributes: [
                "id",
                "name",
                "label",
                "icon",
                "link",
                "description",
                "parentFeatureId",
                "parentId",
            ],
            order: [["name", "ASC"]],
        });
    } catch (err) {
        return err;
    }
};

exports.getFeaturesById = async (id) => {
    try {
        return await features.findByPk(id);
    } catch (err) {
        return err;
    }
};

exports.createFeatures = async (data) => {
    try {
        return await features.create(data);
    } catch (err) {
        return err;
    }
};

// async function createFeatures(dataArray) {
//     const creationPromises = dataArray.map(data => features.create(data));
//     return await Promise.all(creationPromises);
// }

exports.updateFeatures = async (id, dataForUpdate) => {
    try {
        const feature = await features.findByPk(id);
        if (!feature) {
            throw new Error("Feature C not found");
        }
        return await feature.update(dataForUpdate);
    } catch (err) {
        return err;
    }
};

exports.deleteFeatures = async (id) => {
    try {
        const feature = await features.findByPk(id);
        if (!feature) {
            throw new Error("Feature not found");
        }
        return await feature.destroy();
    } catch (err) {
        return err;
    }
};
