const express = require('express');
const router = express.Router({ mergeParams: true });
const PasoController = require('../controllers/pasocontroller');
const { validatorPasoCreate, validatorPasoUpdate } = require('../validators/pasovalidator');

router.get('/', PasoController.get);
router.get('/:id', PasoController.getById);
router.post('/', validatorPasoCreate, PasoController.create);
router.put('/:id', validatorPasoUpdate, PasoController.update);
router.delete('/:id', PasoController.destroy);

module.exports = router;
