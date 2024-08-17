const express = require('express');
const router = express.Router();
const memberInformationRoute = require('./informationRoute');
const memberAddressRoutes = require('./addressRoute');
const memberBankInfoRoutes = require('./bankInfoRoute');
const memberDocumentRoutes = require('./documentRoute')
const nomineeRoute = require('./nomineeRoute')
const installmentRoute = require('./installmentRoute')
const memberShipTypeRoute = require('./memberShipTypeRoute');
const memberStatusRoute = require('./memberStatusRoute');
const memberRegistrationRoute = require('./memberRegistrationRoute');
const memberRelationRoutes = require('./memberRelationRoutes');
const genderRoutes = require('./genderRoutes');
const ifscRoutes = require('./ifscRoutes');

router.use('/member', memberRegistrationRoute);
router.use('/member-information', memberInformationRoute);
router.use('/member-addresses', memberAddressRoutes);
router.use('/member-bank-info', memberBankInfoRoutes);
router.use('/member-document', memberDocumentRoutes);
router.use('/member-nominees', nomineeRoute);
router.use('/member-installments', installmentRoute);

router.use('/membership-types', memberShipTypeRoute);
router.use('/member-status', memberStatusRoute);
router.use('/relations', memberRelationRoutes);
router.use('/genders', genderRoutes);
router.use('/ifsc', ifscRoutes);


module.exports = router;
