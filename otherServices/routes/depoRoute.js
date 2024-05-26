const express = require('express');
const depoController = require('../controllers/depoController');
const router = express.Router();

router.post('/ ', depoController.createDepo);
router.get('/', depoController.getAllDepos);
router.get('/:SRNo', depoController.getDepoById);
router.put('/:SRNo', depoController.updateDepo);
router.delete('/:SRNo', depoController.deleteDepo);

module.exports = router;
