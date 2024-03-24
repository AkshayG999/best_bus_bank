const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { authenticateToken } = require('../middleware/authMid');
const { roleAuth } = require('../middleware/roleAuth');



router.post('/create-role', roleController.createRole);
router.post('/assign-initial-permissions-user', roleController.assigninitialPermissionsToUser);
router.post('/assign-role-permissions-user', roleController.roleAssignToUser,);
router.post('/createInitialPermissions', roleController.createInitialPermissions);

router.get('/', roleController.getRoles);
router.get('/:id', roleController.getRoleById);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

module.exports = router;
