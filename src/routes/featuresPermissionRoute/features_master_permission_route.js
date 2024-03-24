const express = require('express');
const router = express.Router();
const featuresMasterPermissionController = require('../../controllers/featuresPermissionController/features_master_permission_controller');



// Create a new features_master_permission
router.post('/', featuresMasterPermissionController.create);

// Retrieve all features_master_permissions
router.get('/', featuresMasterPermissionController.findAll);

// Retrieve a single features_master_permission with id
router.get('/:id', featuresMasterPermissionController.findOne);

// Update a features_master_permission with id
router.put('/:id', featuresMasterPermissionController.update);

// Delete a features_master_permission with id
router.delete('/:id', featuresMasterPermissionController.delete);



module.exports = router;
