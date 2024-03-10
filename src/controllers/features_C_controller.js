const { createFeatureC, getAllFeaturesC, getFeatureCById, deleteFeatureC, updateFeatureC } = require("../services/featuresCService");


exports.createFeatureC = async (req, res) => {
    try {
        const featureA = await createFeatureC(req.body);
        res.status(201).json(featureA);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getAllFeatureC = async (req, res) => {
    try {
        const featureAList = await getAllFeaturesC();
        res.json(featureAList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getFeatureCById = async (req, res) => {
    const { id } = req.params;
    try {
        const featureA = await getFeatureCById(id);
        if (!featureA) {
            return res.status(404).json({ message: 'Feature A not found' });
        }
        res.json(featureA);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.updateFeatureCById = async (req, res) => {
    const { id } = req.params;
    try {
        let featureA = await getFeatureCById(id);
        if (!featureA) {
            return res.status(404).json({ message: 'Feature A not found' });
        }
        featureA = await updateFeatureC(req.body);
        res.json(featureA);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.deleteFeatureCById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await deleteFeatureC(id);
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Feature A not found' });
        }
        res.json({ message: 'Feature A deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
