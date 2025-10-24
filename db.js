const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('recetas_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
