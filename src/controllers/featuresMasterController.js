const { getAllFeatures, getFeatureById, createFeature, updateFeature, deleteFeature } = require('../services/featuresMasterService');

// Controller functions for CRUD operations
async function getAll(req, res) {
    try {
        const features = await getAllFeatures();
        res.json(features);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getById(req, res) {
    const id = req.params.id;
    try {
        const feature = await getFeatureById(id);
        if (!feature) {
            return res.status(404).json({ message: 'Feature not found' });
        }
        res.json(feature);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function create(req, res) {
    const data = req.body;
    try {
        const newFeature = await createFeature(data);
        res.status(201).json(newFeature);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function update(req, res) {
    const id = req.params.id;
    const data = req.body;
    try {
        const updatedFeature = await updateFeature(id, data);
        res.json(updatedFeature);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function remove(req, res) {
    const id = req.params.id;
    try {
        await deleteFeature(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { getAll, getById, create, update, remove };
