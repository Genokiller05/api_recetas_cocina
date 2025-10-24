const { check, validationResult } = require('express-validator');

const validatorUsuarioCreate = [
  check('nombre').exists().notEmpty(),
  check('username').exists().notEmpty(),
  check('email').exists().notEmpty().isEmail(),
  check('hash_password').exists().notEmpty(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403).send({ errors: err.array() });
    }
  }
];

const validatorUsuarioUpdate = [
  check('nombre').optional().notEmpty(),
  check('username').optional().notEmpty(),
  check('email').optional().notEmpty().isEmail(),
  check('hash_password').optional().notEmpty(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403).send({ errors: err.array() });
    }
  }
];

module.exports = { validatorUsuarioCreate, validatorUsuarioUpdate };
