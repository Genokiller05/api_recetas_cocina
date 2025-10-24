const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/categoriacontroller');
const { validatorCategoriaCreate, validatorCategoriaUpdate } = require('../validators/categoriavalidator');

router.get('/', CategoriaController.get);
router.get('/:id', CategoriaController.getById);
router.post('/', validatorCategoriaCreate, CategoriaController.create);
router.put('/:id', validatorCategoriaUpdate, CategoriaController.update);
router.delete('/:id', CategoriaController.destroy);

module.exports = router;
