const { check, validationResult } = require('express-validator');

const validatorValoracionCreate = [
  check('usuario_id').exists().notEmpty().isNumeric(),
  check('rating').exists().notEmpty().isNumeric({ min: 1, max: 5 }),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403).send({ errors: err.array() });
    }
  }
];

const validatorValoracionUpdate = [
  check('rating').optional().notEmpty().isNumeric({ min: 1, max: 5 }),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403).send({ errors: err.array() });
    }
  }
];

module.exports = { validatorValoracionCreate, validatorValoracionUpdate };
