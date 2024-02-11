const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { authenticateToken } = require('../middleware/authMid');
const { roleAuth } = require('../middleware/roleAuth');


router.post('/', authenticateToken, roleAuth(['ADMIN']), roleController.createRole);
router.get('/', roleController.getRoles);
router.get('/:id', roleController.getRoleById);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

module.exports = router;
