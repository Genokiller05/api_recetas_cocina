const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Importa la conexión a la base de datos

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
const usuarioRoutes = require('./routes/usuarioroutes');
const categoriaRoutes = require('./routes/categoriaroutes');
const ingredienteRoutes = require('./routes/ingredienteroutes');
const pasoRoutes = require('./routes/pasoroutes');
const recetaRoutes = require('./routes/recetaroutes');
const tagRoutes = require('./routes/tagroutes');
const valoracionRoutes = require('./routes/valoracionroutes');
const visitaRoutes = require('./routes/visitaroutes');
const compraRecetaRoutes = require('./routes/comprarecetaroutes');

app.use('/usuarios', usuarioRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/ingredientes', ingredienteRoutes);
app.use('/pasos', pasoRoutes);
app.use('/recetas', recetaRoutes);
app.use('/tags', tagRoutes);
app.use('/valoraciones', valoracionRoutes);
app.use('/visitas', visitaRoutes);
app.use('/compras-recetas', compraRecetaRoutes);

// Conexión a la base de datos
db.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos MySQL establecida correctamente.');
        require('./models/associations'); // Cargar asociaciones de modelos
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});