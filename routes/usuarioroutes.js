const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuariocontroller');
const { validatorUsuarioCreate, validatorUsuarioUpdate } = require('../validators/usuariovalidator');

router.get('/', UsuarioController.get);
router.get('/:id', UsuarioController.getById);
router.post('/', validatorUsuarioCreate, UsuarioController.create);
router.put('/:id', validatorUsuarioUpdate, UsuarioController.update);
router.delete('/:id', UsuarioController.destroy);

module.exports = router;