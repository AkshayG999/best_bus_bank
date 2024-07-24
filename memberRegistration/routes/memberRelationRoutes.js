const express = require('express');
const router = express.Router();
const memberRelationController = require('../controllers/memberRelationController');


router.post('/', memberRelationController.createRelation);
router.get('/:SrNo', memberRelationController.getRelationById);
router.get('/', memberRelationController.getAllRelations);
router.put('/:SrNo', memberRelationController.updateRelation);
router.delete('/:SrNo', memberRelationController.deleteRelation);

module.exports = router;
