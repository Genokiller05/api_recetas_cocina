const Ingrediente = require('../models/ingredientemodel');

const IngredienteController = {
  async get(req, res) {
    try {
      const ingredientes = await Ingrediente.findAll();
      res.send(ingredientes);
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving ingredientes', error });
    }
  },

  async getById(req, res) {
    try {
      const ingrediente = await Ingrediente.findByPk(req.params.id);
      if (ingrediente) {
        res.send(ingrediente);
      } else {
        res.status(404).send({ message: 'Ingrediente not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving ingrediente', error });
    }
  },

  async create(req, res) {
    try {
      const ingrediente = await Ingrediente.create(req.body);
      res.status(201).send(ingrediente);
    } catch (error) {
      res.status(400).send({ message: 'Error creating ingrediente', error });
    }
  },

  async update(req, res) {
    try {
      const ingrediente = await Ingrediente.findByPk(req.params.id);
      if (ingrediente) {
        await ingrediente.update(req.body);
        res.send(ingrediente);
      } else {
        res.status(404).send({ message: 'Ingrediente not found' });
      }
    } catch (error) {
      res.status(400).send({ message: 'Error updating ingrediente', error });
    }
  },

  async destroy(req, res) {
    try {
      const ingrediente = await Ingrediente.findByPk(req.params.id);
      if (ingrediente) {
        await ingrediente.destroy();
        res.status(204).send();
      } else {
        res.status(404).send({ message: 'Ingrediente not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error deleting ingrediente', error });
    }
  }
};

module.exports = IngredienteController;
