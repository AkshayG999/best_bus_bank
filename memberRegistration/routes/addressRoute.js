const express = require('express');
const router = express.Router();
const memberAddressController = require('../controllers/addressController');



router.post('/', memberAddressController.createMemberAddress);
router.get('/', memberAddressController.getAllMemberAddresses);
router.get('/:EntryNo', memberAddressController.getMemberAddressById);
router.put('/:EntryNo', memberAddressController.updateMemberAddress);
router.delete('/:EntryNo', memberAddressController.deleteMemberAddress);

module.exports = router;
