const Visita = require('../models/visitamodel');

const VisitaController = {
  async create(req, res) {
    try {
      const visita = await Visita.create({ 
        receta_id: req.params.receta_id, 
        usuario_id: req.body.usuario_id, // Optional
        ip_hash: req.body.ip_hash, // Should be hashed in a real app
        user_agent: req.get('User-Agent')
      });
      res.status(201).send(visita);
    } catch (error) {
      res.status(400).send({ message: 'Error creating visita', error });
    }
  }
};

module.exports = VisitaController;
