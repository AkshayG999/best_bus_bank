const express = require('express');
const router = express.Router();
const memberInformationRoute = require('./informationRoute');
const memberShipTypeRoute = require('./memberShipTypeRoute');
const memberStatusRoute = require('./memberStatusRoute');


router.use('/member-information', memberInformationRoute);
router.use('/membership-types', memberShipTypeRoute);
router.use('/member-status', memberStatusRoute);

module.exports = router;
