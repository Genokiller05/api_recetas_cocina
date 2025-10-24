const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Visita = sequelize.define('Visita', {
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
    type: DataTypes.BIGINT
  },
  ip_hash: {
    type: DataTypes.CHAR(64)
  },
  user_agent: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'visitas',
  timestamps: true,
  updatedAt: false,
  createdAt: 'visitado_en'
});

module.exports = Visita;
