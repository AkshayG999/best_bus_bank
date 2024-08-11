const express = require('express');
const adminServicesRoutes = require('../adminServices/routes/index');
const userServicesRoutes = require('../userServices/routes/index');
const masterDataEntryRoutes = require('../master_data_entry/routes/index');
const memberRegistrationRoutes = require('../memberRegistration/routes/index');
const accountServicesRoutes = require('../accountServices/routes/index');
const { authenticateToken } = require('../middlewareServices/authMid');

const router = express.Router();


router.use('/api/admin-services', authenticateToken, adminServicesRoutes);
router.use('/api/user-services', userServicesRoutes);
router.use('/api/master-data', authenticateToken, masterDataEntryRoutes);
router.use('/api/members', authenticateToken, memberRegistrationRoutes);
router.use('/api/account-services', authenticateToken, accountServicesRoutes);



module.exports = router;