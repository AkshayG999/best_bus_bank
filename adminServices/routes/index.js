const express = require('express');
const featuresRoute = require('./featuresRoute');
const rolePermissionsRoute = require('./rolePermissionsRoute');
const userPermissionsRoute = require('./userPermissionsRoute');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use('/features', featuresRoute);
router.use('/roles-permissions', rolePermissionsRoute);
router.use('/user', userRoutes);
router.use('/user', userPermissionsRoute);

module.exports = router;
