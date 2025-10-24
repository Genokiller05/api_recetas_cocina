const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Valoracion = sequelize.define('Valoracion', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  receta_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  usuario_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  rating: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  comentario: {
    type: DataTypes.STRING(500)
  }
}, {
  tableName: 'valoraciones',
  timestamps: true,
  updatedAt: 'actualizado_en',
  createdAt: 'creado_en'
});

module.exports = Valoracion;
