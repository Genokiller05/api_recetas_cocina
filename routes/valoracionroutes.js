const express = require('express');
const router = express.Router({ mergeParams: true });
const ValoracionController = require('../controllers/valoracioncontroller');
const { validatorValoracionCreate, validatorValoracionUpdate } = require('../validators/valoracionvalidator');

router.get('/', ValoracionController.get);
router.get('/:id', ValoracionController.getById);
router.post('/', validatorValoracionCreate, ValoracionController.create);
router.put('/:id', validatorValoracionUpdate, ValoracionController.update);
router.delete('/:id', ValoracionController.destroy);

module.exports = router;