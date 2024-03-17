const express = require('express');
const router = express.Router();
const featuresCPermissionController = require('../../controllers/featuresPermissionController/features_C_permission_controller');



router.post('/', featuresCPermissionController.create);

// Retrieve all features_A_permissions
router.get('/', featuresCPermissionController.findAll);

// Retrieve a single features_A_permission with id
router.get('/:id', featuresCPermissionController.findOne);

// Update a features_A_permission with id
router.put('/:id', featuresCPermissionController.update);

// Delete a features_A_permission with id
router.delete('/:id', featuresCPermissionController.delete);



module.exports = router;