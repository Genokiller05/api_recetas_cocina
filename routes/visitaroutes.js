const express = require('express');
const router = express.Router({ mergeParams: true });
const VisitaController = require('../controllers/visitacontroller');

router.get('/', VisitaController.get);
router.post('/', VisitaController.create);

module.exports = router;
