const express = require('express');
const router = express.Router();
const genderController = require('../controllers/genderController');

// Routes for gender
router.post('/', genderController.createGender);
router.get('/:SrNo', genderController.getGenderById);
router.get('/', genderController.getAllGenders);
router.put('/:SrNo', genderController.updateGender);
router.delete('/:SrNo', genderController.deleteGender);

module.exports = router;
