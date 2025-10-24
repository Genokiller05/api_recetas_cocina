const express = require('express');
const router = express.Router({ mergeParams: true });
const CompraRecetaController = require('../controllers/comprarecetacontroller');
const { validatorCompraRecetaCreate, validatorCompraRecetaUpdate } = require('../validators/comprarecetavalidator');

router.get('/', CompraRecetaController.get);
router.get('/:id', CompraRecetaController.getById);
router.post('/', validatorCompraRecetaCreate, CompraRecetaController.create);
router.put('/:id', validatorCompraRecetaUpdate, CompraRecetaController.update);
router.delete('/:id', CompraRecetaController.destroy);

module.exports = router;