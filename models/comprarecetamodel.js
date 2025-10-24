const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const CompraReceta = sequelize.define('CompraReceta', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  receta_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  comprador_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  amount_mxn: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pendiente', 'pagado', 'fallido', 'reembolsado'),
    defaultValue: 'pendiente'
  },
  referencia_pago: {
    type: DataTypes.STRING(120)
  }
}, {
  tableName: 'compras_receta',
  timestamps: true,
  updatedAt: 'actualizado_en',
  createdAt: 'creado_en'
});

module.exports = CompraReceta;
