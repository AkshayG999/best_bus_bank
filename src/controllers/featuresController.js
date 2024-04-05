const featuresHelper = require("../helper/featuresHelper");
const featuresService = require("../services/featuresService");



exports.createFeatures = async (req, res) => {
    try {
        const { name, description, parentFeatureId } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        if (parentFeatureId) {
            let findParentFeature = await featuresService.getFeaturesById(parentFeatureId);
            return res.status(400).json({ message: 'Description is required' });
        }
        let data = { name: name, description: name, };

        if (parentFeatureId) {
            data.parentFeatureId = parentFeatureId;
        }

        const featureA = await featuresService.createFeatures(data);
        return res.status(201).json(featureA);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
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
        let result;

        // Get Hierarchy
        if (features_tree) {
            if (featuresList.length > 0) {

                featuresList = featuresList.map(item => ({
                    id: item.dataValues.id,
                    name: item.dataValues.name,
                    description: item.dataValues.description,
                    parentFeatureId: item.dataValues.parentFeatureId,
                }));

                console.log(featuresList)
                // Get Master ID data  
                if (master_id) {
                    result = featuresHelper.generateHierarchy(master_id, featuresList, level = 0);
                    console.log(JSON.stringify(result, null, 2));
                } else {
                    // Get all hierarchy
                    result = featuresHelper.formatHierarchy(featuresList, master_id);
                    console.log(JSON.stringify(result, null, 2));
                }

                return res.status(200).send({ success: true, message: "Fetched successfully", result });
            }
        }

        return res.status(200).send({ success: true, message: "Fetched successfully", result: featuresList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}


exports.getFeaturesForNewRole = async (req, res) => {
    const { id } = req.params;
    try {

        let featuresList = await featuresService.getFilterFeatures({});

        featuresList = featuresList.map(item => ({
            id: item.dataValues.id,
            name: item.dataValues.name,
            description: item.dataValues.description,
            parentFeatureId: item.dataValues.parentFeatureId,
        }));
        console.log(featuresList);

        const result = featuresHelper.featuresWithReadWrite(id, featuresList, level = 0);

        return res.status(200).send({ success: true, message: "Fetched successfully", result: result });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Internal server error', error });
    }
};

exports.getAllFeatures = async (req, res) => {
    try {
        const featureAList = await featuresService.getAllFeatures();
        res.json(featureAList);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error', error });
    }
};


exports.fetchFeaturesHierarchy = async (req, res) => {
    try {
        const { features_master } = req.query;

        let filter = {};

        const featuresList = await featuresService.getFilterFeatures();


        return res.status(200).send({ result: featuresList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


exports.getFeaturesById = async (req, res) => {
    const { id } = req.params;
    try {
        const featureA = await featuresService.getFeaturesById(id);
        if (!featureA) {
            return res.status(404).send({ message: 'Feature A not found' });
        }
        return res.status(200).send({ success: true, message: "Fetched successfully", result: featureA });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error', error });
    }
};


exports.updateFeaturesById = async (req, res) => {
    const { id } = req.params;
    const { name, parentFeatureId } = req.body;
    try {
        let featureA = await featuresService.getFeaturesById(id);
        if (!featureA) {
            return res.status(404).send({ success: false, message: 'Feature A not found' });
        }
        let dataForUpdate = {}
        if (parentFeatureId) {
            dataForUpdate.parentFeatureId = parentFeatureId;
        }
        if (name) {
            dataForUpdate.name = name;
            dataForUpdate.description = name;
        }
        featureA = await featuresService.updateFeatures(id, dataForUpdate);
        return res.status(200).send({ success: true, message: "Updated successfully", result: featureA, });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error', error });
    }
};


exports.deleteFeaturesById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await featuresService.deleteFeatures(id);
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Feature A not found' });
        }
        res.json({ message: 'Feature A deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

