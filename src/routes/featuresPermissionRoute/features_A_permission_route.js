const express = require('express');
const router = express.Router();
const featuresAPermissionController = require('../../controllers/featuresPermissionController/features_A_permission_controller');



router.post('/', featuresAPermissionController.create);

// Retrieve all features_A_permissions
router.get('/', featuresAPermissionController.findAll);

// Retrieve a single features_A_permission with id
router.get('/:id', featuresAPermissionController.findOne);

// Update a features_A_permission with id
router.put('/:id', featuresAPermissionController.update);

// Delete a features_A_permission with id
router.delete('/:id', featuresAPermissionController.delete);



module.exports = router;