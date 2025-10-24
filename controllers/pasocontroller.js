const Paso = require('../models/pasomodel');

const PasoController = {
  async get(req, res) {
    try {
      const pasos = await Paso.findAll({ where: { receta_id: req.params.receta_id } });
      res.send(pasos);
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving pasos', error });
    }
  },

  async getById(req, res) {
    try {
      const paso = await Paso.findOne({ where: { id: req.params.id, receta_id: req.params.receta_id } });
      if (paso) {
        res.send(paso);
      } else {
        res.status(404).send({ message: 'Paso not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving paso', error });
    }
  },

  async create(req, res) {
    try {
      const paso = await Paso.create({ ...req.body, receta_id: req.params.receta_id });
      res.status(201).send(paso);
    } catch (error) {
      res.status(400).send({ message: 'Error creating paso', error });
    }
  },

  async update(req, res) {
    try {
      const paso = await Paso.findOne({ where: { id: req.params.id, receta_id: req.params.receta_id } });
      if (paso) {
        await paso.update(req.body);
        res.send(paso);
      } else {
        res.status(404).send({ message: 'Paso not found' });
      }
    } catch (error) {
      res.status(400).send({ message: 'Error updating paso', error });
    }
  },

  async destroy(req, res) {
    try {
      const paso = await Paso.findOne({ where: { id: req.params.id, receta_id: req.params.receta_id } });
      if (paso) {
        await paso.destroy();
        res.status(204).send();
      } else {
        res.status(404).send({ message: 'Paso not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error deleting paso', error });
    }
  }
};

module.exports = PasoController;
