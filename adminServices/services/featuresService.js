const { where } = require("sequelize");
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

exports.updateFeatures = async (id, dataForUpdate, transaction) => {
    try {
        const result = await features.update(dataForUpdate, { where: { id }, returning: true }, { transaction });
        if (result[0] == 0) {
            throw new Error("Feature not found");
        }
        return result[1][0];
    } catch (err) {
        return err;
    }
};

exports.deleteFeatures = async (id, transaction) => {
    try {
        return await features.destroy({ where: { id } }, { transaction });
    } catch (err) {
        return err;
    }
};
