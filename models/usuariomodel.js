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

const Receta = require('./recetamodel');
const ColaboradoresReceta = require('./colaboradoresrecetamodel');

Usuario.belongsToMany(Receta, { through: ColaboradoresReceta, foreignKey: 'usuario_id' });

const Visita = require('./visitamodel');

Usuario.hasMany(Visita, { foreignKey: 'usuario_id' });

const Valoracion = require('./valoracionmodel');

Usuario.hasMany(Valoracion, { foreignKey: 'usuario_id' });

const CompraReceta = require('./comprarecetamodel');

Usuario.hasMany(CompraReceta, { foreignKey: 'comprador_id' });

module.exports = Usuario;
