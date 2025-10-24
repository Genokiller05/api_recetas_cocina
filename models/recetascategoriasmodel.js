const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const RecetasCategorias = sequelize.define('RecetasCategorias', {
  receta_id: {
    type: DataTypes.BIGINT,
    primaryKey: true
  },
  categoria_id: {
    type: DataTypes.BIGINT,
    primaryKey: true
  }
}, {
  tableName: 'recetas_categorias',
  timestamps: false
});

module.exports = RecetasCategorias;
