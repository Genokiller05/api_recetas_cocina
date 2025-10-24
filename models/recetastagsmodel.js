const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const RecetasTags = sequelize.define('RecetasTags', {
  receta_id: {
    type: DataTypes.BIGINT,
    primaryKey: true
  },
  tag_id: {
    type: DataTypes.BIGINT,
    primaryKey: true
  }
}, {
  tableName: 'recetas_tags',
  timestamps: false
});

module.exports = RecetasTags;
