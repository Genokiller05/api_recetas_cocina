const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcryptjs');

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
    type: DataTypes.STRING,
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
  timestamps: false,
  hooks: {
    beforeCreate: (usuario) => {
      const salt = bcrypt.genSaltSync(10);
      usuario.hash_password = bcrypt.hashSync(usuario.hash_password, salt);
    }
  }
});

Usuario.prototype.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};

module.exports = Usuario;