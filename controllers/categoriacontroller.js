const Categoria = require('../models/categoriamodel');

const CategoriaController = {
  async get(req, res) {
    try {
      const categorias = await Categoria.findAll({ include: ['subcategorias'] });
      res.send(categorias);
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving categorias', error });
    }
  },

  async getById(req, res) {
    try {
      const categoria = await Categoria.findByPk(req.params.id, { include: ['subcategorias'] });
      if (categoria) {
        res.send(categoria);
      } else {
        res.status(404).send({ message: 'Categoria not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving categoria', error });
    }
  },

  async create(req, res) {
    try {
      const categoria = await Categoria.create(req.body);
      res.status(201).send(categoria);
    } catch (error) {
      res.status(400).send({ message: 'Error creating categoria', error });
    }
  },

  async update(req, res) {
    try {
      const categoria = await Categoria.findByPk(req.params.id);
      if (categoria) {
        await categoria.update(req.body);
        res.send(categoria);
      } else {
        res.status(404).send({ message: 'Categoria not found' });
      }
    } catch (error) {
      res.status(400).send({ message: 'Error updating categoria', error });
    }
  },

  async destroy(req, res) {
    try {
      const categoria = await Categoria.findByPk(req.params.id);
      if (categoria) {
        await categoria.destroy();
        res.status(204).send();
      } else {
        res.status(404).send({ message: 'Categoria not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error deleting categoria', error });
    }
  }
};

module.exports = CategoriaController;
