// routes/memberInformationRoute.js
const express = require('express');
const router = express.Router();
const memberInformationController = require('../controllers/informationController');

// Basic Details
router.post('/basic-details', memberInformationController.basicDetailsCreate);
router.get('/basic-details/:id', memberInformationController.basicDetailsGet);
router.put('/basic-details/:id', memberInformationController.basicDetailsUpdate);

// Personal Info
router.put('/personal-info/:id', memberInformationController.personalInfoUpdate);
router.get('/personal-info/:id', memberInformationController.personalInfoGet);


router.get('/', memberInformationController.getAllMembers);
router.put('/:id', memberInformationController.updateMember);
router.delete('/:id', memberInformationController.deleteMember);

module.exports = router;
