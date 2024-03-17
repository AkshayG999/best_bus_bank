const express = require('express');
const router = express.Router();
const featuresAController = require('../../controllers/featuresController/features_A_controller');

// Define routes
router.post('/', featuresAController.createFeatureA);
router.get('/', featuresAController.getAllFeatureA);
router.get('/:id', featuresAController.getFeatureAById);
router.put('/:id', featuresAController.updateFeatureAById);
router.delete('/:id', featuresAController.deleteFeatureAById);

module.exports = router;
