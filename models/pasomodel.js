const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Paso = sequelize.define('Paso', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  receta_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  numero_orden: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  instruccion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  duracion_min: {
    type: DataTypes.SMALLINT
  }
}, {
  tableName: 'pasos',
  timestamps: false
});

module.exports = Paso;
