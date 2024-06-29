const express = require('express');
const router = express.Router();
const membershipTypeController = require('../controllers/memberShipTypeController');




router.get('/', membershipTypeController.getAll);
router.get('/:id', membershipTypeController.getById);
router.post('', membershipTypeController.create);
router.put('/:id', membershipTypeController.update);
router.delete('/:id', membershipTypeController.deleteMembershipType);


module.exports = router;
