const express = require("express");
const router = express.Router();
const individualAccountController = require('../controllers/individualAccountController');
const { authenticateToken } = require("../../middlewareServices/authMid");
const { checkPermissionsMiddleware } = require("../../middlewareServices/permissionsMiddleware");



// router.get('/', authenticateToken, checkPermissionsMiddleware('18e9b143528rg7sc6', 'individualAccount Creation'), individualAccountController.getindividualAccounts)
// router.post('/', authenticateToken, checkPermissionsMiddleware('18e9b143528rg7sc6', 'individualAccount Creation', true), individualAccountController.createindividualAccount)


router.post('/', individualAccountController.createIndividualAccount)
router.get('/', individualAccountController.getIndividualAccounts)
router.put('/:TrNo', individualAccountController.updateIndividualAccount)
router.delete('/:TrNo', individualAccountController.deleteIndividualAccount)



module.exports = router