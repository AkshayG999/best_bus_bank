const { errorMid, handleErrors } = require("../../middlewareServices/errorMid");
const featuresHelper = require("../helper/featuresHelper");
const featuresService = require("../services/featuresService");



exports.createFeatures = async (req, res) => {
    try {
        const { name, description, parentFeatureId } = req.body;
        if (!name) {
            return errorMid(400, "Name is required", req, res);
        }
        if (parentFeatureId) {
            let findParentFeature = await featuresService.getFeaturesById(
                parentFeatureId
            );
            return errorMid(
                400,
                `${parentFeatureId} is not a parent feature Id`,
                req,
                res
            );
        }
        let data = { name: name, description: name };

        if (parentFeatureId) {
            data.parentFeatureId = parentFeatureId;
        }

        const feature = await featuresService.createFeatures(data);
        return res.status(201).json({
            success: true,
            message: "Created successfully",
            result: feature,
        });
    } catch (error) {
        console.error(error);
        return handleErrors(error, req, res);
    }
};

exports.fetchFeatures = async (req, res) => {
    try {
        const { features_master, features_tree, master_id } = req.query;

        let filter = {};
        let featuresList;

        if (features_master) {
            filter.parentFeatureId = null;
        }

        featuresList = await featuresService.getFilterFeatures(filter);
        if (featuresList.length == 0) {
            return errorMid(
                404,
                `features not found`,
                req,
                res
            );
        }

        // Get Hierarchy
        let result;
        if (features_tree) {
            if (featuresList.length > 0) {
                featuresList = featuresList.map((item) => ({
                    id: item.dataValues.id,
                    name: item.dataValues.name,
                    description: item.dataValues.description,
                    parentFeatureId: item.dataValues.parentFeatureId,
                }));

                console.log(featuresList);
                // Get Master ID data
                if (master_id) {
                    result = featuresHelper.generateHierarchy(
                        master_id,
                        featuresList,
                        (level = 0)
                    );
                    console.log(JSON.stringify(result, null, 2));
                } else {
                    // Get all hierarchy
                    result = featuresHelper.formatHierarchy(featuresList, master_id);
                    console.log(JSON.stringify(result, null, 2));
                }

                return res
                    .status(200)
                    .send({ success: true, message: "Fetched successfully", result });
            }
        }

        return res.status(200).send({
            success: true,
            message: "Fetched successfully",
            result: featuresList,
        });
    } catch (error) {
        console.error(error);
        return handleErrors(error, req, res);
    }
};

exports.getFeaturesForNewRole = async (req, res) => {
    const { id } = req.params;
    try {
        let featuresList = await featuresService.getFilterFeatures({});
        if (featuresList.length == 0) {
            return errorMid(
                404,
                `features not found`,
                req,
                res
            );
        }
        featuresList = featuresList.map((item) => ({
            id: item.dataValues.id,
            name: item.dataValues.name,
            description: item.dataValues.description,
            parentFeatureId: item.dataValues.parentFeatureId,
        }));
        console.log(featuresList);

        const result = featuresHelper.featuresWithReadWrite(
            id,
            featuresList,
            (level = 0)
        );

        return res
            .status(200)
            .send({ success: true, message: "Fetched successfully", result: result });
    } catch (error) {
        console.error(error);
        return handleErrors(error, req, res);
    }
};

exports.getAllFeatures = async (req, res) => {
    try {
        const featureAList = await featuresService.getAllFeatures();
        if (featureAList.length == 0) {
            return errorMid(
                404,
                `features not found`,
                req,
                res
            );
        }
        return res.status(200).json({
            success: true,
            message: "Fetched successfully",
            result: featureAList,
        });
    } catch (error) {
        console.error(error);
        return handleErrors(error, req, res);
    }
};

exports.getFeaturesById = async (req, res) => {
    const { id } = req.params;
    try {
        const featureA = await featuresService.getFeaturesById(id);
        if (!featureA) {
            return errorMid(
                404,
                `feature with ${id} not found`,
                req,
                res
            );
        }
        return res.status(200).send({
            success: true,
            message: "Fetched successfully",
            result: featureA,
        });
    } catch (error) {
        console.error(error);
        return handleErrors(error, req, res);
    }
};

exports.updateFeaturesById = async (req, res) => {
    const { id } = req.params;
    const { name, parentFeatureId } = req.body;
    try {
        let featureA = await featuresService.getFeaturesById(id);
        if (!featureA) {
            return errorMid(
                400,
                `feature with ${id} not found`,
                req,
                res
            );
        }
        let dataForUpdate = {};
        if (parentFeatureId) {
            dataForUpdate.parentFeatureId = parentFeatureId;
        }
        if (name) {
            dataForUpdate.name = name;
            dataForUpdate.description = name;
        }
        featureA = await featuresService.updateFeatures(id, dataForUpdate);
        return res.status(200).send({
            success: true,
            message: "Updated successfully",
            result: featureA,
        });
    } catch (error) {
        console.error(error);
        return handleErrors(error, req, res);
    }
};

exports.deleteFeaturesById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await featuresService.deleteFeatures(id);
        if (deletedCount === 0) {
            return errorMid(
                400,
                `feature with ${id} not found`,
                req,
                res
            );
        }
        return res
            .status(200)
            .json({ success: true, message: "Feature deleted successfully" });
    } catch (error) {
        console.error(error);
        return handleErrors(error, req, res);
    }
};
