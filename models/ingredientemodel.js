const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Ingrediente = sequelize.define('Ingrediente', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(120),
    allowNull: false,
    unique: true
  },
  unidad_base: {
    type: DataTypes.STRING(30)
  }
}, {
  tableName: 'ingredientes',
  timestamps: false
});

const Receta = require('./recetamodel');
const RecetasIngredientes = require('./recetasingredientesmodel');

Ingrediente.belongsToMany(Receta, { through: RecetasIngredientes, foreignKey: 'ingrediente_id' });

module.exports = Ingrediente;
