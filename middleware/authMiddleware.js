const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuariomodel');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener el token del header (formato: "Bearer TOKEN")
      token = req.headers.authorization.split(' ')[1];

      // Verificar el token
      // IMPORTANTE: Usar la misma clave secreta que en el login
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Adjuntar el usuario al objeto request, excluyendo la contraseña
      req.user = await Usuario.findByPk(decoded.id, {
        attributes: { exclude: ['hash_password'] }
      });

      if (!req.user) {
          return res.status(401).json({ message: 'No autorizado, usuario no encontrado.' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'No autorizado, el token falló' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No autorizado, no hay token' });
  }
};

module.exports = { protect };
