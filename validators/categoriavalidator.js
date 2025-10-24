const { check, validationResult } = require('express-validator');

const validatorCategoriaCreate = [
  check('nombre').exists().notEmpty(),
  check('slug').exists().notEmpty(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403).send({ errors: err.array() });
    }
  }
];

const validatorCategoriaUpdate = [
  check('nombre').optional().notEmpty(),
  check('slug').optional().notEmpty(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403).send({ errors: err.array() });
    }
  }
];

module.exports = { validatorCategoriaCreate, validatorCategoriaUpdate };
