const express = require('express');
const router = express.Router();
const IngredienteController = require('../controllers/ingredientecontroller');
const { validatorIngredienteCreate, validatorIngredienteUpdate } = require('../validators/ingredientevalidator');

router.get('/', IngredienteController.get);
router.get('/:id', IngredienteController.getById);
router.post('/', validatorIngredienteCreate, IngredienteController.create);
router.put('/:id', validatorIngredienteUpdate, IngredienteController.update);
router.delete('/:id', IngredienteController.destroy);

module.exports = router;
