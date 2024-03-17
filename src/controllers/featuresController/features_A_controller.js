const { createFeatureA, getAllFeaturesA, getFeatureAById, updateFeatureA } = require("../../services/featuresService/featuresAService");



exports.createFeatureA = async (req, res) => {
    try {
        const featureA = await createFeatureA(req.body);
        res.status(201).json(featureA);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllFeatureA = async (req, res) => {
    try {
        const featureAList = await getAllFeaturesA();
        res.json(featureAList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getFeatureAById = async (req, res) => {
    const { id } = req.params;
    try {
        const featureA = await getFeatureAById(id);
        if (!featureA) {
            return res.status(404).json({ message: 'Feature A not found' });
        }
        res.json(featureA);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.updateFeatureAById = async (req, res) => {
    const { id } = req.params;
    try {
        let featureA = await getFeatureAById(id);
        if (!featureA) {
            return res.status(404).json({ message: 'Feature A not found' });
        }
        featureA = await updateFeatureA(req.body);
        res.json(featureA);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.deleteFeatureAById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await deleteFeatureA(id);
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Feature A not found' });
        }
        res.json({ message: 'Feature A deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
