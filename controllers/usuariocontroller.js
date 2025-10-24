const Usuario = require('../models/usuariomodel');

const UsuarioController = {
  async get(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.send(usuarios);
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving usuarios', error });
    }
  },

  async getById(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (usuario) {
        res.send(usuario);
      } else {
        res.status(404).send({ message: 'Usuario not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving usuario', error });
    }
  },

  async create(req, res) {
    try {
      const usuario = await Usuario.create(req.body);
      res.status(201).send(usuario);
    } catch (error) {
      res.status(400).send({ message: 'Error creating usuario', error });
    }
  },

  async update(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (usuario) {
        await usuario.update(req.body);
        res.send(usuario);
      } else {
        res.status(404).send({ message: 'Usuario not found' });
      }
    } catch (error) {
      res.status(400).send({ message: 'Error updating usuario', error });
    }
  },

  async destroy(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (usuario) {
        await usuario.destroy();
        res.status(204).send();
      } else {
        res.status(404).send({ message: 'Usuario not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error deleting usuario', error });
    }
  }
};

module.exports = UsuarioController;
