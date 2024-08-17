const express = require('express');
const IFSCController = require('../controllers/ifscController');

const router = express.Router();

router.post('/', IFSCController.createIFSC);
router.get('/:ifscCode', IFSCController.getIFSC);
router.get('/', IFSCController.getAllIFSCs);
router.put('/:ifscCode', IFSCController.updateIFSC);
router.delete('/:ifscCode', IFSCController.deleteIFSC);

module.exports = router;
