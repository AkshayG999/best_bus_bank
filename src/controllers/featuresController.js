const { generateHierarchy, formatHierarchy, featuresWithReadWrite } = require("../helper/featuresHelper");
const { createFeatures, getAllFeatures, getFeaturesById, updateFeatures, deleteFeatures, getFilterFeatures } = require("../services/featuresService");



exports.createFeatures = async (req, res) => {
    try {
        const { name, description, parentFeatureId } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        if (!description) {
            return res.status(400).json({ message: 'Description is required' });
        }
        let data = { name: name, description: description, };

        if (parentFeatureId) {
            data.parentFeatureId = parentFeatureId;
        }

        const featureA = await createFeatures(data);
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

        featuresList = await getFilterFeatures(filter);

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

                // Get Master ID data  
                if (master_id) {
                    result = generateHierarchy(master_id, featuresList, level = 0);
                    console.log(JSON.stringify(result, null, 2));
                } else {
                    // Get all hierarchy
                    result = formatHierarchy(featuresList, master_id);
                    console.log(JSON.stringify(result, null, 2));
                }

                return res.status(200).send({ result });
            }
        }

        return res.status(200).send({ featuresList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}


exports.getFeaturesForNewRole = async (req, res) => {
    const { id } = req.params;
    try {

        let featuresList = await getFilterFeatures({});

        featuresList = featuresList.map(item => ({
            id: item.dataValues.id,
            name: item.dataValues.name,
            description: item.dataValues.description,
            parentFeatureId: item.dataValues.parentFeatureId,
        }));
        console.log(featuresList);

        const result = featuresWithReadWrite(id, featuresList, level = 0);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllFeatures = async (req, res) => {
    try {
        const featureAList = await getAllFeatures();
        res.json(featureAList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.fetchFeaturesHierarchy = async (req, res) => {
    try {
        const { features_master } = req.query;

        let filter = {};

        const featursList = await getFilterFeatures();


        return res.status(200).send({ featursList: hierarchy });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



exports.getFeaturesById = async (req, res) => {
    const { id } = req.params;
    try {
        const featureA = await getFeaturesById(id);
        if (!featureA) {
            return res.status(404).json({ message: 'Feature A not found' });
        }
        res.json(featureA);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.updateFeaturesById = async (req, res) => {
    const { id } = req.params;
    const { parentFeatureId } = req.body;
    try {
        let featureA = await getFeaturesById(id);
        if (!featureA) {
            return res.status(404).json({ message: 'Feature A not found' });
        }
        featureA = await updateFeatures(id, parentFeatureId);
        res.json(featureA);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.deleteFeaturesById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await deleteFeatures(id);
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Feature A not found' });
        }
        res.json({ message: 'Feature A deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

