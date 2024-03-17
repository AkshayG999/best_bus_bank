const express = require('express');
const router = express.Router();
const featuresBController = require('../../controllers/featuresController/features_B_controller');

// Define routes
router.post('/', featuresBController.createFeatureB);
router.get('/', featuresBController.getAllFeatureB);
router.get('/:id', featuresBController.getFeatureBById);
router.put('/:id', featuresBController.updateFeatureBById);
router.delete('/:id', featuresBController.deleteFeatureBById);

module.exports = router;
