const express = require('express');
const router = express.Router();
const featuresCController = require('../controllers/features_C_controller');

// Define routes
router.post('/', featuresCController.createFeatureC);
router.get('/', featuresCController.getAllFeatureC);
router.get('/:id', featuresCController.getFeatureCById);
router.put('/:id', featuresCController.updateFeatureCById);
router.delete('/:id', featuresCController.deleteFeatureCById);

module.exports = router;
