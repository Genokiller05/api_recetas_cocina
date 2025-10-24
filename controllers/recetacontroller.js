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
      // Asignar el autor_id desde el usuario autenticado en el token
      const recetaData = { ...req.body, autor_id: req.user.id };
      const receta = await Receta.create(recetaData);
      res.status(201).send(receta);
    } catch (error) {
      res.status(400).send({ message: 'Error creating receta', error });
    }
  },

  async update(req, res) {
    try {
      const receta = await Receta.findByPk(req.params.id);
      if (!receta) {
        return res.status(404).send({ message: 'Receta not found' });
      }

      // Verificar que el usuario es el autor de la receta
      if (receta.autor_id !== req.user.id) {
        return res.status(403).send({ message: 'Acción no autorizada. No eres el autor de esta receta.' });
      }

      await receta.update(req.body);
      res.send(receta);
    } catch (error) {
      res.status(400).send({ message: 'Error updating receta', error });
    }
  },

  async destroy(req, res) {
    try {
      const receta = await Receta.findByPk(req.params.id);
      if (!receta) {
        return res.status(404).send({ message: 'Receta not found' });
      }

      // Verificar que el usuario es el autor de la receta
      if (receta.autor_id !== req.user.id) {
        return res.status(403).send({ message: 'Acción no autorizada. No eres el autor de esta receta.' });
      }

      await receta.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ message: 'Error deleting receta', error });
    }
  }
};

module.exports = RecetaController;
