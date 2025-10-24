const express = require('express');
const router = express.Router();
const TagController = require('../controllers/tagcontroller');
const { validatorTagCreate, validatorTagUpdate } = require('../validators/tagvalidator');

router.get('/', TagController.get);
router.get('/:id', TagController.getById);
router.post('/', validatorTagCreate, TagController.create);
router.put('/:id', validatorTagUpdate, TagController.update);
router.delete('/:id', TagController.destroy);

module.exports = router;
