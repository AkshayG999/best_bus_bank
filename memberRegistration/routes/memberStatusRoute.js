const express = require('express');
const router = express.Router();
const statusController = require('../controllers/memberStatusController');



router.get('/', statusController.getAll);
router.get('/:id', statusController.getById);
router.post('/', statusController.create);
router.put('/:id', statusController.update);
router.delete('/:id', statusController.deleteStatus);


module.exports = router;