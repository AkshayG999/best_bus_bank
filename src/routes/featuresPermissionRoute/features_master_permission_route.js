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



// // Create a new features_A_permission
// router.post('/', featuresAPermissionController.create);

// // Retrieve all features_A_permissions
// router.get('/', featuresAPermissionController.findAll);

// // Retrieve a single features_A_permission with id
// router.get('/:id', featuresAPermissionController.findOne);

// // Update a features_A_permission with id
// router.put('/:id', featuresAPermissionController.update);

// // Delete a features_A_permission with id
// router.delete('/:id', featuresAPermissionController.delete);


// // Create a new features_B_permission
// router.post('/', featuresBPermissionController.create);

// // Retrieve all features_B_permissions
// router.get('/', featuresBPermissionController.findAll);

// // Retrieve a single features_B_permission with id
// router.get('/:id', featuresBPermissionController.findOne);

// // Update a features_B_permission with id
// router.put('/:id', featuresBPermissionController.update);

// // Delete a features_B_permission with id
// router.delete('/:id', featuresBPermissionController.delete);


// // Create a new features_C_permission
// router.post('/', featuresCPermissionController.create);

// // Retrieve all features_C_permissions
// router.get('/', featuresCPermissionController.findAll);

// // Retrieve a single features_C_permission with id
// router.get('/:id', featuresCPermissionController.findOne);

// // Update a features_C_permission with id
// router.put('/:id', featuresCPermissionController.update);

// // Delete a features_C_permission with id
// router.delete('/:id', featuresCPermissionController.delete);

module.exports = router;
