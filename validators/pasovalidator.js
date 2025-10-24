const { check, validationResult } = require('express-validator');

const validatorPasoCreate = [
  check('numero_orden').exists().notEmpty().isNumeric(),
  check('instruccion').exists().notEmpty(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403).send({ errors: err.array() });
    }
  }
];

const validatorPasoUpdate = [
  check('numero_orden').optional().notEmpty().isNumeric(),
  check('instruccion').optional().notEmpty(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403).send({ errors: err.array() });
    }
  }
];

module.exports = { validatorPasoCreate, validatorPasoUpdate };
