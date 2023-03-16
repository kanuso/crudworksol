const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./database');

const app = express();

// Configurar body-parser para procesar peticiones con cuerpo en formato JSON
app.use(bodyParser.json());

// Definir el modelo de datos
const Carro = sequelize.define('Carro', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Crear la tabla si no existe
(async () => {
  await sequelize.sync();
  console.log('Tabla creada');
})();

// Definir las rutas de la API
app.get('/api/carros', async (req, res) => {
  const carros = await Carro.findAll();
  res.json(carros);
});

app.get('/api/carros/:id', async (req, res) => {
  const carro = await Carro.findByPk(req.params.id);
  if (carro) {
    res.json(carro);
  } else {
    res.status(404).json({ message: 'Carro no encontrado' });
  }
});

app.post('/api/carros', async (req, res) => {
  const carro = await Carro.create(req.body);
  res.json(carro);
});

app.put('/api/carros/:id', async (req, res) => {
  const carro = await Carro.findByPk(req.params.id);
  if (carro) {
    await carro.update(req.body);
    res.json(carro);
  } else {
    res.status(404).json({ message: 'Carro no encontrado' });
  }
});

app.delete('/api/carros/:id', async (req, res) => {
  const carro = await Carro.findByPk(req.params.id);
  if (carro) {
    await carro.destroy();
    res.json({ message: 'Carro eliminado' });
  } else {
    res.status(404).json({ message: 'Carro no encontrado' });
  }
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
