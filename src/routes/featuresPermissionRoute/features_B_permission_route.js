const express = require('express');
const router = express.Router();
const featuresBPermissionController = require('../../controllers/featuresPermissionController/features_B_permission_controller');



router.post('/', featuresBPermissionController.create);

// Retrieve all features_A_permissions
router.get('/', featuresBPermissionController.findAll);

// Retrieve a single features_A_permission with id
router.get('/:id', featuresBPermissionController.findOne);

// Update a features_A_permission with id
router.put('/:id', featuresBPermissionController.update);

// Delete a features_A_permission with id
router.delete('/:id', featuresBPermissionController.delete);



module.exports = router;