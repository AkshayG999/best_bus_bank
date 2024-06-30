const express = require('express');
const router = express.Router();
const memberNomineeController = require('../controllers/nomineeController');


router.post('/', memberNomineeController.createNominee);
router.get('/', memberNomineeController.getAllNominees);
router.get('/:EntryNo', memberNomineeController.getNomineeById);
router.put('/:EntryNo', memberNomineeController.updateNominee);
router.delete('/:EntryNo', memberNomineeController.deleteNominee);

module.exports = router;
