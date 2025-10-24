const express = require('express');
const router = express.Router();
const TagController = require('../controllers/tagcontroller');
const { validatorTagCreate, validatorTagUpdate } = require('../validators/tagvalidator');

router.get('/tags', TagController.get);
router.get('/tags/:id', TagController.getById);
router.post('/tags', validatorTagCreate, TagController.create);
router.put('/tags/:id', validatorTagUpdate, TagController.update);
router.delete('/tags/:id', TagController.destroy);

module.exports = router;
