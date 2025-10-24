const Tag = require('../models/tagmodel');

const TagController = {
  async get(req, res) {
    try {
      const tags = await Tag.findAll();
      res.send(tags);
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving tags', error });
    }
  },

  async getById(req, res) {
    try {
      const tag = await Tag.findByPk(req.params.id);
      if (tag) {
        res.send(tag);
      } else {
        res.status(404).send({ message: 'Tag not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving tag', error });
    }
  },

  async create(req, res) {
    try {
      const tag = await Tag.create(req.body);
      res.status(201).send(tag);
    } catch (error) {
      res.status(400).send({ message: 'Error creating tag', error });
    }
  },

  async update(req, res) {
    try {
      const tag = await Tag.findByPk(req.params.id);
      if (tag) {
        await tag.update(req.body);
        res.send(tag);
      } else {
        res.status(404).send({ message: 'Tag not found' });
      }
    } catch (error) {
      res.status(400).send({ message: 'Error updating tag', error });
    }
  },

  async destroy(req, res) {
    try {
      const tag = await Tag.findByPk(req.params.id);
      if (tag) {
        await tag.destroy();
        res.status(204).send();
      } else {
        res.status(404).send({ message: 'Tag not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error deleting tag', error });
    }
  }
};

module.exports = TagController;
