const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  slug: {
    type: DataTypes.STRING(120),
    allowNull: false,
    unique: true
  },
  parent_id: {
    type: DataTypes.BIGINT
  }
}, {
  tableName: 'categorias',
  timestamps: false
});

Categoria.hasMany(Categoria, { as: 'subcategorias', foreignKey: 'parent_id' });
Categoria.belongsTo(Categoria, { as: 'parent', foreignKey: 'parent_id' });

const Receta = require('./recetamodel');
const RecetasCategorias = require('./recetascategoriasmodel');

Categoria.belongsToMany(Receta, { through: RecetasCategorias, foreignKey: 'categoria_id' });

module.exports = Categoria;
