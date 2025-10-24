const { check } = require('express-validator');
const Usuario = require('../models/usuariomodel');

const validatorRegister = [
    check('nombre')
        .notEmpty().withMessage('El nombre es obligatorio.'),

    check('username')
        .notEmpty().withMessage('El username es obligatorio.'),

    check('email')
        .notEmpty().withMessage('El email es obligatorio.')
        .isEmail().withMessage('Debe ser un email válido.')
        .custom(async (value) => {
            const usuario = await Usuario.findOne({ where: { email: value } });
            if (usuario) {
                return Promise.reject('El email ya está en uso.');
            }
        }),

    check('password')
        .notEmpty().withMessage('La contraseña es obligatoria.')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
];

const validatorLogin = [
    check('email')
        .notEmpty().withMessage('El email es obligatorio.')
        .isEmail().withMessage('Debe ser un email válido.'),

    check('password')
        .notEmpty().withMessage('La contraseña es obligatoria.')
];

module.exports = {
    validatorRegister,
    validatorLogin
};