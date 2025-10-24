const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Tag = sequelize.define('Tag', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(60),
    allowNull: false,
    unique: true
  },
  slug: {
    type: DataTypes.STRING(80),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'tags',
  timestamps: false
});

const Receta = require('./recetamodel');
const RecetasTags = require('./recetastagsmodel');

Tag.belongsToMany(Receta, { through: RecetasTags, foreignKey: 'tag_id' });

module.exports = Tag;
