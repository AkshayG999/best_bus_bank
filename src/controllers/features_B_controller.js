const { createFeatureB, getAllFeaturesB, getFeatureBById, updateFeatureB, deleteFeatureB } = require("../services/featuresBService");



// Create a new feature A
exports.createFeatureB = async (req, res) => {
    try {
        const featureA = await createFeatureB(req.body);
        res.status(201).json(featureA);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all feature A
exports.getAllFeatureB = async (req, res) => {
    try {
        const featureAList = await getAllFeaturesB();
        res.json(featureAList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single feature A by ID
exports.getFeatureBById = async (req, res) => {
    const { id } = req.params;
    try {
        const featureA = await getFeatureBById(id);
        if (!featureA) {
            return res.status(404).json({ message: 'Feature A not found' });
        }
        res.json(featureA);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a feature A by ID
exports.updateFeatureBById = async (req, res) => {
    const { id } = req.params;
    try {
        let featureA = await getFeatureBById(id);
        if (!featureA) {
            return res.status(404).json({ message: 'Feature A not found' });
        }
        featureA = await updateFeatureB(req.body);
        res.json(featureA);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a feature A by ID
exports.deleteFeatureBById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await deleteFeatureB(id);
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Feature A not found' });
        }
        res.json({ message: 'Feature A deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
