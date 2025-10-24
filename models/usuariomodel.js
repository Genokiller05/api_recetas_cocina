const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  hash_password: {
    type: DataTypes.CHAR(60),
    allowNull: false
  },
  foto_url: {
    type: DataTypes.STRING(500)
  },
  bio: {
    type: DataTypes.STRING(280)
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;