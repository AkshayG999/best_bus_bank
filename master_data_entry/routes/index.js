const express = require('express');
const parentGroupRoute = require('./parentGroupRoute');
const groupRoute = require('./groupRoute');
const individualAccountRoute = require('./individualAccountRoute');
const bankRoute = require('./bankRoute');
const bankBranchRoute = require('./bankBranchRoute');
const branchRoute = require('./branchRoute');
const departmentRoute = require('./departmentRoute');
const depoRoute = require('./depoRoute');
const router = express.Router();


router.use('/parent-group', parentGroupRoute);
router.use('/group', groupRoute);
router.use('/individual-account', individualAccountRoute);
router.use('/bank', bankRoute);
router.use('/bank-branch', bankBranchRoute);
router.use('/branch', branchRoute);
router.use('/department', departmentRoute);
router.use('/depos', depoRoute);

module.exports = router;
