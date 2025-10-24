const Receta = require('../models/recetamodel');

const RecetaController = {
  async get(req, res) {
    try {
      const recetas = await Receta.findAll();
      res.send(recetas);
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving recetas', error });
    }
  },

  async getById(req, res) {
    try {
      const receta = await Receta.findByPk(req.params.id);
      if (receta) {
        res.send(receta);
      } else {
        res.status(404).send({ message: 'Receta not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving receta', error });
    }
  },

  async create(req, res) {
    try {
      const receta = await Receta.create(req.body);
      res.status(201).send(receta);
    } catch (error) {
      res.status(400).send({ message: 'Error creating receta', error });
    }
  },

  async update(req, res) {
    try {
      const receta = await Receta.findByPk(req.params.id);
      if (receta) {
        await receta.update(req.body);
        res.send(receta);
      } else {
        res.status(404).send({ message: 'Receta not found' });
      }
    } catch (error) {
      res.status(400).send({ message: 'Error updating receta', error });
    }
  },

  async destroy(req, res) {
    try {
      const receta = await Receta.findByPk(req.params.id);
      if (receta) {
        await receta.destroy();
        res.status(204).send();
      } else {
        res.status(404).send({ message: 'Receta not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error deleting receta', error });
    }
  }
};

module.exports = RecetaController;
