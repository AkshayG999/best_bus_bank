const express = require('express');
const accountRoute = require('./vmainRoutes');
const accountTransTypeRoute = require('./vmainTransTypeRoutes');

const router = express.Router();


router.use('/accounts', accountRoute);
router.use('/account-trans-types', accountTransTypeRoute);

module.exports = router;
