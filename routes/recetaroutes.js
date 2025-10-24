const express = require('express');
const router = express.Router();
const RecetaController = require('../controllers/recetacontroller');
const { validatorRecetaCreate, validatorRecetaUpdate } = require('../validators/recetavalidator');

router.get('/recetas', RecetaController.get);
router.get('/recetas/:id', RecetaController.getById);
router.post('/recetas', validatorRecetaCreate, RecetaController.create);
router.put('/recetas/:id', validatorRecetaUpdate, RecetaController.update);
router.delete('/recetas/:id', RecetaController.destroy);

const pasoRoutes = require('./pasoroutes');

router.use('/:receta_id/pasos', pasoRoutes);

const visitaRoutes = require('./visitaroutes');

router.use('/:receta_id/visitas', visitaRoutes);

const valoracionRoutes = require('./valoracionroutes');

router.use('/:receta_id/valoraciones', valoracionRoutes);

const compraRecetaRoutes = require('./comprarecetaroutes');

router.use('/:receta_id/compras', compraRecetaRoutes);

module.exports = router;
