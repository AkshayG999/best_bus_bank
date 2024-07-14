const express = require('express');
const router = express.Router();
const memberRegistrationController = require('../controllers/memberRegistrationController');



router.post('/create', memberRegistrationController.createMember);
router.get('/:EntryNo', memberRegistrationController.getMemberInformations);
router.put('/:EntryNo', memberRegistrationController.updateMember);

module.exports = router;