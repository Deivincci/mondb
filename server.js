const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Crear una aplicación de Express
const app = express();

// Usar body-parser para leer el cuerpo de las solicitudes
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/tienda-en-linea', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.log('Error al conectar a MongoDB:', err));

// Definir el esquema del producto
const productoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  categoria: String,
  descripcion: String
});

// Crear el modelo para el producto
const Producto = mongoose.model('Producto', productoSchema);

// API para agregar productos
app.post('/productos', (req, res) => {
  const nuevoProducto = new Producto(req.body);
  nuevoProducto.save()
    .then((producto) => res.status(201).json(producto))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// API para ver los productos
app.get('/productos', (req, res) => {
  Producto.find()
    .then((productos) => res.status(200).json(productos))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
