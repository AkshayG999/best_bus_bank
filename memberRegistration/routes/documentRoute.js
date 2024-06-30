const express = require('express');
const router = express.Router();
const memberDocumentController = require('../controllers/documentController');


router.post('/', memberDocumentController.createDocument);
router.get('/', memberDocumentController.getAllDocuments);
router.get('/:EntryNo', memberDocumentController.getDocumentById);
router.put('/:EntryNo', memberDocumentController.updateDocument);
router.delete('/:EntryNo', memberDocumentController.deleteDocument);

module.exports = router;
