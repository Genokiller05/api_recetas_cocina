const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const RecetasIngredientes = sequelize.define('RecetasIngredientes', {
  receta_id: {
    type: DataTypes.BIGINT,
    primaryKey: true
  },
  ingrediente_id: {
    type: DataTypes.BIGINT,
    primaryKey: true
  },
  cantidad: {
    type: DataTypes.DECIMAL(10, 3)
  },
  unidad: {
    type: DataTypes.STRING(30)
  },
  step_hint: {
    type: DataTypes.SMALLINT
  },
  notas: {
    type: DataTypes.STRING(200)
  }
}, {
  tableName: 'recetas_ingredientes',
  timestamps: false
});

module.exports = RecetasIngredientes;
