const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ColaboradoresReceta = sequelize.define('ColaboradoresReceta', {
  receta_id: {
    type: DataTypes.BIGINT,
    primaryKey: true
  },
  usuario_id: {
    type: DataTypes.BIGINT,
    primaryKey: true
  },
  rol: {
    type: DataTypes.ENUM('editor'),
    defaultValue: 'editor'
  },
  invitado_en: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  aceptado_en: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'colaboradores_receta',
  timestamps: false
});

module.exports = ColaboradoresReceta;
