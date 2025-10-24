const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authcontroller');
const { validatorRegister, validatorLogin } = require('../validators/authvalidator');

// Ruta para registrar un nuevo usuario
router.post('/register', validatorRegister, register);

// Ruta para iniciar sesión
router.post('/login', validatorLogin, login);

module.exports = router;
