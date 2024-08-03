const express = require("express");
const router = express.Router();
const individualAccountController = require('../controllers/individualAccountController');
const { authenticateToken } = require("../../middlewareServices/authMid");
const { checkPermissionsMiddleware } = require("../../middlewareServices/permissionsMiddleware");



// router.get('/',  checkPermissionsMiddleware('18e9b143528rg7sc6', 'individualAccount Creation'), individualAccountController.getindividualAccounts)
// router.post('/',  checkPermissionsMiddleware('18e9b143528rg7sc6', 'individualAccount Creation', true), individualAccountController.createindividualAccount)


router.post('/', individualAccountController.create)
router.get('/:AccSrNo', individualAccountController.getByTrNo)
router.get('/accounts', individualAccountController.getByFilter)
router.get('/', individualAccountController.getAll)
router.put('/:AccSrNo', individualAccountController.update)
router.delete('/:AccSrNo', individualAccountController.delete)



module.exports = router