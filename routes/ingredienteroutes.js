const express = require('express');
const router = express.Router();
const IngredienteController = require('../controllers/ingredientecontroller');
const { validatorIngredienteCreate, validatorIngredienteUpdate } = require('../validators/ingredientevalidator');

router.get('/ingredientes', IngredienteController.get);
router.get('/ingredientes/:id', IngredienteController.getById);
router.post('/ingredientes', validatorIngredienteCreate, IngredienteController.create);
router.put('/ingredientes/:id', validatorIngredienteUpdate, IngredienteController.update);
router.delete('/ingredientes/:id', IngredienteController.destroy);

module.exports = router;
