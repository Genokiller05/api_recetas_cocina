const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Usuario = require('./usuariomodel');

const Receta = sequelize.define('Receta', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  autor_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING(220),
    allowNull: false,
    unique: true
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  tiempo_preparacion_min: {
    type: DataTypes.SMALLINT
  },
  porciones: {
    type: DataTypes.SMALLINT
  },
  visibilidad: {
    type: DataTypes.ENUM('publica', 'privada', 'no_listada'),
    defaultValue: 'publica'
  },
  precio_mxn: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  publicado: {
    type: DataTypes.TINYINT(1),
    defaultValue: 1
  }
}, {
  tableName: 'recetas',
  timestamps: false
});

const ColaboradoresReceta = require('./colaboradoresrecetamodel');

Receta.belongsTo(Usuario, { foreignKey: 'autor_id' });
const Ingrediente = require('./ingredientemodel');
const RecetasIngredientes = require('./recetasingredientesmodel');

Receta.belongsToMany(Usuario, { through: ColaboradoresReceta, foreignKey: 'receta_id' });
Receta.belongsToMany(Ingrediente, { through: RecetasIngredientes, foreignKey: 'receta_id' });

const Paso = require('./pasomodel');

Receta.hasMany(Paso, { foreignKey: 'receta_id' });

const Categoria = require('./categoriamodel');
const RecetasCategorias = require('./recetascategoriasmodel');

Receta.belongsToMany(Categoria, { through: RecetasCategorias, foreignKey: 'receta_id' });

const Tag = require('./tagmodel');
const RecetasTags = require('./recetastagsmodel');

Receta.belongsToMany(Tag, { through: RecetasTags, foreignKey: 'receta_id' });

const Visita = require('./visitamodel');

Receta.hasMany(Visita, { foreignKey: 'receta_id' });

const Valoracion = require('./valoracionmodel');

Receta.hasMany(Valoracion, { foreignKey: 'receta_id' });

const CompraReceta = require('./comprarecetamodel');

Receta.hasMany(CompraReceta, { foreignKey: 'receta_id' });

module.exports = Receta;
