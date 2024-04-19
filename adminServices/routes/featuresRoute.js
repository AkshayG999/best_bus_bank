const express = require('express');
const router = express.Router();
const featuresController = require('../controllers/featuresController');


router.post('/', featuresController.createFeatures);

router.get('/get-new-features/:id', featuresController.getFeaturesForNewRole);
router.get('/:id', featuresController.getFeaturesById);
router.get('/', featuresController.fetchFeatures);

router.put('/:id', featuresController.updateFeaturesById);
router.delete('/:id', featuresController.deleteFeaturesById);


module.exports = router;