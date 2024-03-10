const express = require('express');
const router = express.Router();
const permissionsController = require('../controllers/featurePermissionsController');

// Routes for permissions CRUD operations
router.post('/', permissionsController.createUserPermissions);
router.get('/:userId', permissionsController.getUserPermissions);
router.put('/:userId', permissionsController.updateUserPermissions);
router.delete('/:userId', permissionsController.deleteUserPermissions);

module.exports = router;
