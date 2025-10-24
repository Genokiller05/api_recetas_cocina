const Valoracion = require('../models/valoracionmodel');

const ValoracionController = {
  async get(req, res) {
    try {
      let query = {};
      if (req.params.receta_id) {
        query = { where: { receta_id: req.params.receta_id } };
      }
      const valoraciones = await Valoracion.findAll(query);
      res.send(valoraciones);
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving valoraciones', error });
    }
  },

  async getById(req, res) {
    try {
      const valoracion = await Valoracion.findOne({ where: { id: req.params.id, receta_id: req.params.receta_id } });
      if (valoracion) {
        res.send(valoracion);
      } else {
        res.status(404).send({ message: 'Valoracion not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving valoracion', error });
    }
  },

  async create(req, res) {
    try {
      const valoracion = await Valoracion.create({ ...req.body, receta_id: req.params.receta_id });
      res.status(201).send(valoracion);
    } catch (error) {
      res.status(400).send({ message: 'Error creating valoracion', error });
    }
  },

  async update(req, res) {
    try {
      const valoracion = await Valoracion.findOne({ where: { id: req.params.id, receta_id: req.params.receta_id } });
      if (valoracion) {
        await valoracion.update(req.body);
        res.send(valoracion);
      } else {
        res.status(404).send({ message: 'Valoracion not found' });
      }
    } catch (error) {
      res.status(400).send({ message: 'Error updating valoracion', error });
    }
  },

  async destroy(req, res) {
    try {
      const valoracion = await Valoracion.findOne({ where: { id: req.params.id, receta_id: req.params.receta_id } });
      if (valoracion) {
        await valoracion.destroy();
        res.status(204).send();
      } else {
        res.status(404).send({ message: 'Valoracion not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error deleting valoracion', error });
    }
  }
};

module.exports = ValoracionController;
