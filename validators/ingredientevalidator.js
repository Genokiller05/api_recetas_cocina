const { check, validationResult } = require('express-validator');

const validatorIngredienteCreate = [
  check('nombre').exists().notEmpty(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403).send({ errors: err.array() });
    }
  }
];

const validatorIngredienteUpdate = [
  check('nombre').optional().notEmpty(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403).send({ errors: err.array() });
    }
  }
];

module.exports = { validatorIngredienteCreate, validatorIngredienteUpdate };
