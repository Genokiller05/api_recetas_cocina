const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Usuario = require('./usuariomodel');

const Receta = sequelize.define('Receta', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  autor_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING(220),
    allowNull: false,
    unique: true
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  tiempo_preparacion_min: {
    type: DataTypes.SMALLINT
  },
  porciones: {
    type: DataTypes.SMALLINT
  },
  visibilidad: {
    type: DataTypes.ENUM('publica', 'privada', 'no_listada'),
    defaultValue: 'publica'
  },
  precio_mxn: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  publicado: {
    type: DataTypes.TINYINT(1),
    defaultValue: 1
  }
}, {
  tableName: 'recetas',
  timestamps: false
});

module.exports = Receta;