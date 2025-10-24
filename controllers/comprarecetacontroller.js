const CompraReceta = require('../models/comprarecetamodel');

const CompraRecetaController = {
  async get(req, res) {
    try {
      const compras = await CompraReceta.findAll({ where: { receta_id: req.params.receta_id } });
      res.send(compras);
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving compras', error });
    }
  },

  async getById(req, res) {
    try {
      const compra = await CompraReceta.findOne({ where: { id: req.params.id, receta_id: req.params.receta_id } });
      if (compra) {
        res.send(compra);
      } else {
        res.status(404).send({ message: 'Compra not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving compra', error });
    }
  },

  async create(req, res) {
    try {
      const compra = await CompraReceta.create({ ...req.body, receta_id: req.params.receta_id });
      res.status(201).send(compra);
    } catch (error) {
      res.status(400).send({ message: 'Error creating compra', error });
    }
  },

  async update(req, res) {
    try {
      const compra = await CompraReceta.findOne({ where: { id: req.params.id, receta_id: req.params.receta_id } });
      if (compra) {
        await compra.update(req.body);
        res.send(compra);
      } else {
        res.status(404).send({ message: 'Compra not found' });
      }
    } catch (error) {
      res.status(400).send({ message: 'Error updating compra', error });
    }
  },

  async destroy(req, res) {
    try {
      const compra = await CompraReceta.findOne({ where: { id: req.params.id, receta_id: req.params.receta_id } });
      if (compra) {
        await compra.destroy();
        res.status(204).send();
      } else {
        res.status(404).send({ message: 'Compra not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error deleting compra', error });
    }
  }
};

module.exports = CompraRecetaController;
