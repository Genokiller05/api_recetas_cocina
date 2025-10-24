const { check, validationResult } = require('express-validator');

const validatorRecetaCreate = [
  check('titulo').exists().notEmpty(),
  check('slug').exists().notEmpty(),
  check('autor_id').exists().notEmpty().isNumeric(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403).send({ errors: err.array() });
    }
  }
];

const validatorRecetaUpdate = [
  check('titulo').optional().notEmpty(),
  check('slug').optional().notEmpty(),
  check('autor_id').optional().notEmpty().isNumeric(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403).send({ errors: err.array() });
    }
  }
];

module.exports = { validatorRecetaCreate, validatorRecetaUpdate };
