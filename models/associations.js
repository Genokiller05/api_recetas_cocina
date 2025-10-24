const Receta = require('./recetamodel');
const Usuario = require('./usuariomodel');
const ColaboradoresReceta = require('./colaboradoresrecetamodel');
const Ingrediente = require('./ingredientemodel');
const RecetasIngredientes = require('./recetasingredientesmodel');
const Paso = require('./pasomodel');
const Categoria = require('./categoriamodel');
const RecetasCategorias = require('./recetascategoriasmodel');
const Tag = require('./tagmodel');
const RecetasTags = require('./recetastagsmodel');
const Visita = require('./visitamodel');
const Valoracion = require('./valoracionmodel');
const CompraReceta = require('./comprarecetamodel');

// Receta associations
Receta.belongsTo(Usuario, { foreignKey: 'autor_id' });
Receta.belongsToMany(Usuario, { through: ColaboradoresReceta, foreignKey: 'receta_id' });
Receta.belongsToMany(Ingrediente, { through: RecetasIngredientes, foreignKey: 'receta_id' });
Receta.hasMany(Paso, { foreignKey: 'receta_id' });
Receta.belongsToMany(Categoria, { through: RecetasCategorias, foreignKey: 'receta_id' });
Receta.belongsToMany(Tag, { through: RecetasTags, foreignKey: 'receta_id' });
Receta.hasMany(Visita, { foreignKey: 'receta_id' });
Receta.hasMany(Valoracion, { foreignKey: 'receta_id' });
Receta.hasMany(CompraReceta, { foreignKey: 'receta_id' });

// Usuario associations
Usuario.belongsToMany(Receta, { through: ColaboradoresReceta, foreignKey: 'usuario_id' });
Usuario.hasMany(Visita, { foreignKey: 'usuario_id' });
Usuario.hasMany(Valoracion, { foreignKey: 'usuario_id' });
Usuario.hasMany(CompraReceta, { foreignKey: 'comprador_id' });

// Export nothing, as associations are applied directly
