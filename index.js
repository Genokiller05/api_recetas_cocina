
const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./db');
const userRoutes = require('./routes/usuarioroutes');
const recetaRoutes = require('./routes/recetaroutes');
const ingredienteRoutes = require('./routes/ingredienteroutes.js');
const categoriaRoutes = require('./routes/categoriaroutes.js');
const tagRoutes = require('./routes/tagroutes.js');

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', recetaRoutes);
app.use('/api', ingredienteRoutes);
app.use('/api', categoriaRoutes);
app.use('/api', tagRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
});
