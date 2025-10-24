const { check, validationResult } = require('express-validator');

const validatorCompraRecetaCreate = [
  check('comprador_id').exists().notEmpty().isNumeric(),
  check('amount_mxn').exists().notEmpty().isDecimal(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403).send({ errors: err.array() });
    }
  }
];

const validatorCompraRecetaUpdate = [
  check('status').optional().notEmpty(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403).send({ errors: err.array() });
    }
  }
];

module.exports = { validatorCompraRecetaCreate, validatorCompraRecetaUpdate };
