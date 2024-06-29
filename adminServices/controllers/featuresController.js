const { errorMid, handleErrors } = require("../../middlewareServices/errorMid");
const featuresHelper = require("../helper/featuresHelper");
const featuresService = require("../services/featuresService");
    const { sequelize } = require("../../db/db");
    const { Sequelize, Op } = require("sequelize");
    const AuditLogRepository = require('../../auditServices/auditLogService');



exports.createFeatures = async (req, res, next) => {
    const transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        const { name, icon, link, parentFeatureId } = req.body;
        if (!name) {
            return next({ status: 400, message: "Name is required" });
        }
        if (parentFeatureId) {
            let findParentFeature = await featuresService.getFeaturesById(
                parentFeatureId
            );
            if (!findParentFeature) {
                return next({ status: 400, message: `${parentFeatureId} is not a parent feature Id` });
            }
        }
        let data = { name: name, description: name, label: name, link: link };

        if (parentFeatureId) {
            data.parentFeatureId = parentFeatureId;
            data.parentId = parentFeatureId;
        }

        if (icon) {
            data.icon = icon;
        }
        const feature = await featuresService.createFeatures(data);
        await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "featureModel",
            entityId: feature.id,
            action: "CREATE",
            beforeAction: null,
            afterAction: feature,
        }, transaction);

        await transaction.commit();

        return res.status(201).json({
            success: true,
            message: "Created successfully",
            result: feature,
        });
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error(error);
        return next(error);
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
                    label: item.dataValues.label || item.name,
                    icon: item.dataValues.icon,
                    link: item.dataValues.link,
                    description: item.dataValues.description,
                    parentFeatureId: item.dataValues.parentFeatureId,
                    parentId: item.dataValues.parentId,
                }));

                // console.log({featuresList});
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
            label: item.dataValues.label,
            icon: item.dataValues.icon,
            link: item.dataValues.link,
            description: item.dataValues.description,
            parentFeatureId: item.dataValues.parentFeatureId,
            parentId: item.dataValues.parentId,
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
    const transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        const { id } = req.params;
        const { name, parentFeatureId, icon, link, } = req.body;
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
        // if (parentFeatureId) {
        //     dataForUpdate.parentFeatureId = parentFeatureId;
        //     dataForUpdate.parentId = parentFeatureId;
        // }
        // if (name) {
        //     dataForUpdate.name = name;
        //     dataForUpdate.description = name;
        //     dataForUpdate.label = name;
        // }
        // if (link) {
        //     dataForUpdate.link = link;
        // }
        if (name) {
            dataForUpdate.name = name;
            dataForUpdate.description = name;
            dataForUpdate.label = name;
        } else {
            dataForUpdate.label = featureA.dataValues.name;
        }

        if (parentFeatureId) {
            dataForUpdate.parentFeatureId = parentFeatureId;
            dataForUpdate.parentId = parentFeatureId;
        } else {
            dataForUpdate.parentId = featureA.dataValues.parentFeatureId;
        }

        if (link) {
            dataForUpdate.link = link;
        }
        if (icon) {
            dataForUpdate.icon = icon;
        }

        const featureUpdate = await featuresService.updateFeatures(id, dataForUpdate, transaction);

        await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "featureModel",
            entityId: id,
            action: "UPDATE",
            beforeAction: featureA,
            afterAction: featureUpdate,
        }, transaction);

        await transaction.commit();
        return res.status(200).send({
            success: true,
            message: "Updated successfully",
            result: featureUpdate,
        });
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error(error);
        return handleErrors(error, req, res);
    }
};

exports.deleteFeaturesById = async (req, res) => {
    const transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
    });
    try {
        const { id } = req.params;
        const feature = await featuresService.getFeaturesById(id);
        if (!feature) {
            return errorMid(
                400,
                `feature with ${id} not found`,
                req,
                res
            );
        }
        const deletedCount = await featuresService.deleteFeatures(id, transaction);
        if (deletedCount === 0) {
            return errorMid(
                400,
                `feature with ${id} not found`,
                req,
                res
            );
        }
        await AuditLogRepository.log({
            SystemID: req.systemID,
            entityName: "featureModel",
            entityId: id,
            action: "UPDATE",
            beforeAction: feature,
            afterAction: null,
        }, transaction);

        await transaction.commit();
        return res
            .status(200)
            .json({ success: true, message: "Feature deleted successfully" });
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error(error);
        return handleErrors(error, req, res);
    }
};