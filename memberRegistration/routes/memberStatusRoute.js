const express = require('express');
const router = express.Router();
const statusController = require('../controllers/memberStatusController');



router.get('/statuses', statusController.getAll);
router.get('/statuses/:id', statusController.getById);
router.post('/statuses', statusController.create);
router.put('/statuses/:id', statusController.update);
router.delete('/statuses/:id', statusController.deleteStatus);


module.exports = router;