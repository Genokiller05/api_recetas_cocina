const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuariocontroller');
const { validatorUsuarioCreate, validatorUsuarioUpdate } = require('../validators/usuariovalidator');

router.get('/usuarios', UsuarioController.get);
router.get('/usuarios/:id', UsuarioController.getById);
router.post('/usuarios', validatorUsuarioCreate, UsuarioController.create);
router.put('/usuarios/:id', validatorUsuarioUpdate, UsuarioController.update);
router.delete('/usuarios/:id', UsuarioController.destroy);

module.exports = router;
