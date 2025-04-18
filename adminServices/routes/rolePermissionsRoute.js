const express = require('express');
const router = express.Router();
const rolePermissionController = require('../controllers/rolePermissionController');



router.post('/', rolePermissionController.createRolePermission);
router.get('/get-role-permissions', rolePermissionController.getRolePermissionById);
router.get('/', rolePermissionController.getAllRolePermissions);
router.put('/:id', rolePermissionController.updateRolePermission);
router.delete('/:id', rolePermissionController.deleteRolePermission);


module.exports = router;