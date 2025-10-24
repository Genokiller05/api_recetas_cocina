const Usuario = require('../models/usuariomodel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// @desc    Registrar un nuevo usuario
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nombre, username, email, password } = req.body;

    // El hook en el modelo se encargará de hashear el password
    const newUser = await Usuario.create({
      nombre,
      username,
      email,
      hash_password: password 
    });

    res.status(201).json({
      message: 'Usuario registrado exitosamente.',
      userId: newUser.id
    });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
  }
};

// @desc    Autenticar un usuario y obtener un token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const isMatch = usuario.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const payload = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email
    };

    // IMPORTANTE: El secreto del token debe estar en una variable de entorno, no hardcodeado.
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h' // El token expira en 1 hora
    });

    res.json({
      message: 'Login exitoso',
      token: token
    });

  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};
