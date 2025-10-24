const express = require('express');
const router = express.Router();
const RecetaController = require('../controllers/recetacontroller');
const { validatorRecetaCreate, validatorRecetaUpdate } = require('../validators/recetavalidator');

router.get('/', RecetaController.get);
router.get('/:id', RecetaController.getById);
router.post('/', validatorRecetaCreate, RecetaController.create);
router.put('/:id', validatorRecetaUpdate, RecetaController.update);
router.delete('/:id', RecetaController.destroy);

const pasoRoutes = require('./pasoroutes');

router.use('/:receta_id/pasos', pasoRoutes);

const visitaRoutes = require('./visitaroutes');

router.use('/:receta_id/visitas', visitaRoutes);

const valoracionRoutes = require('./valoracionroutes');

router.use('/:receta_id/valoraciones', valoracionRoutes);

const compraRecetaRoutes = require('./comprarecetaroutes');

router.use('/:receta_id/compras', compraRecetaRoutes);

module.exports = router;
