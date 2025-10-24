const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/categoriacontroller');
const { validatorCategoriaCreate, validatorCategoriaUpdate } = require('../validators/categoriavalidator');

router.get('/categorias', CategoriaController.get);
router.get('/categorias/:id', CategoriaController.getById);
router.post('/categorias', validatorCategoriaCreate, CategoriaController.create);
router.put('/categorias/:id', validatorCategoriaUpdate, CategoriaController.update);
router.delete('/categorias/:id', CategoriaController.destroy);

module.exports = router;
