const express = require('express');
const router = express.Router();
const memberRegistrationController = require('../controllers/memberRegistrationController');



router.post('/create', memberRegistrationController.createMember);
router.get('/', memberRegistrationController.getMemberInformations);
router.put('/:EntryNo/:mem_SrNo', memberRegistrationController.updateMember);
router.delete("/:EntryNo/:mem_SrNo", memberRegistrationController.deleteMember);


module.exports = router;