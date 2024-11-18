# Proyecto Tienda en Línea con Node.js y MongoDB

Este es un proyecto de ejemplo para configurar un entorno de desarrollo en local utilizando **Node.js** y **MongoDB**. Es una aplicación de "Tienda en Línea" que permite gestionar productos en una tienda.

## Objetivo
Configurar un entorno de desarrollo con **Node.js** y **MongoDB** para simular una tienda en línea, permitiendo realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los productos.

## Funcionalidades
- **GET**: Obtener todos los productos o un producto específico.
- **POST**: Añadir un nuevo producto a la tienda.
- **PUT**: Actualizar la información de un producto existente.
- **DELETE**: Eliminar un producto de la tienda.

## Instalación

1. Clona este repositorio a tu máquina local:

   git clone https://github.com/Deivincci/mondb.git
Instala las dependencias con npm:
npm install

Configura tu archivo .env con la URL de tu base de datos MongoDB:
MONGODB_URI=mongodb://localhost:27017/mondb

Inicia el servidor:
node server.js

Ejecución con Postman
Para interactuar con la API, puedes usar Postman para hacer peticiones GET, POST, PUT y DELETE.

GET: Obtener todos los productos.

URL: http://localhost:3000/productos
Método: GET
GET: Obtener un producto por ID.

URL: http://localhost:3000/productos/{id}
Método: GET
POST: Crear un nuevo producto.

URL: http://localhost:3000/productos
Método: POST
Cuerpo de la petición (JSON):

{
  "nombre": "Producto de ejemplo",
  "precio": 19.99,
  "descripcion": "Descripción del producto"
}
PUT: Actualizar un producto existente.

URL: http://localhost:3000/productos/{id}
Método: PUT
Cuerpo de la petición (JSON):

{
  "nombre": "Producto actualizado",
  "precio": 24.99,
  "descripcion": "Descripción actualizada"
}
DELETE: Eliminar un producto.

URL: http://localhost:3000/api/productos/{id}
Método: DELETE

![Texto alternativo de la imagen](https://github.com/Deivincci/mondb/blob/main/pantallazo2.png?raw=true)

### Explicación de las secciones:
- **Objetivo**: Se explica brevemente el propósito del proyecto.
- **Funcionalidades**: Se mencionan las operaciones CRUD que puedes realizar a través de las rutas de la API.
- **Instalación**: Guía paso a paso para instalar y configurar el entorno de desarrollo.
- **Ejecución con Postman**: Detalles sobre cómo realizar peticiones usando Postman, incluyendo ejemplos de las rutas y el formato esperado de las peticiones.
- **Captura de Pantalla**: (Si has subido una imagen al repositorio) Aquí puedes mostrar una imagen del proyecto en ejecución para darle más contexto a los visitantes del repositorio.




