Objetivo: Configurar un entorno de desarrollo en local con Node.js y MongoDB para una aplicación de “Tienda en Línea”

----------------------------------------------------------------------------------------------------------------------

PARA ESTE PROYECTO NECESITAMOS NODE.JS Y MONGODB
DEL SIGUIENTE ENLACE PODEMOS DESCARGAR Y INSTALAR NODE.JS

https://nodejs.org/en

EL SIGUIENTE ENLACE ES PARA DESCARGAR Y INSTALAR MONGODB

https://www.mongodb.com/try/download/community

TIENES QUE SELECCIONAR 3 OPCIONES PARA QUE SEA EL INSTALADOR APROPIADO PARA TU PLATAFORMA
POR LO GENERAL USUARIOS DE WINDOWS DEJARAN LA VERSION TAL Y COMO LA ENCUENTREN(SUELE SER LA MAS ACTUAL)
PLATFORM ELEGIREMOS WINDOWS X64 (SUELE SER EL STANDARD MAS UTILIZADO)
Y EN PACKAGE ELEGIREMOS MSI
NOTA:CON TODO ESTO PODREMOS TRABAJAR DE MANERA LOCAL INCLUSO AUNQUE NOS QUEDEMOS SIN CONEXION A INTERNET,POR EL CONTRARIO TENGO QUE AÑADIR
QUE EXISTE OTRA OPCION LLAMADA "MongoDB Atlas" ESTO ES IDEAL SINO QUIERES INSTALAR MONGODB Y QUIERES TRABAJAR CON SU BASE DE DATOS EN LA NUBE
DURANTE AMBAS INSTALACIONES PARA TRABAJAR EN LOCAL NOS BASTA LA CONFIGURACION "DEFAULT" ASI QUE BASICAMENTE SERA CLICKAR NEXT HASTA FINALIZAR
NOTA: MONGODB PUEDE TARDAR UNOS MINUTOS EN INSTALAR,LA INSTALACION SE ENCARGA DE EVALUAR LOS RECURSOS EN EL SISTEMA.
------------------------------------------------------------------------------------------------------------------------
UNA VEZ INSTALADOS TODOS LOS REQUISITOS PULSAMOS TECLA 
WINDOWS + R,ABRIRA UN RECUADRO EJECUTAR,DENTRO ESCRIBIREMOS CMD Y PULSAREMOS ACEPTAR
ESTO NOS ABRIRA UNA TERMINAL DESDE LA QUE COMENZAREMOS EL PROCESO
------------------------------------------------------------------------------------------------------------------------
CREAMOS LA CARPETA EN LA QUE TRABAJAREMOS
mkdir mf0493_3_mongodb_david_moral

ACCEDEMOS A LA CARPETA QUE ACABAMOS DE CREAR
cd mf0493_3_mongodb_david_moral

INICIALIZAMOS EL PROYECTO CON NPM USANDO EL SIGUIENTE COMANDO
npm init -y

INSTALAMOS EXPRESS Y DEPENDENCIAS NECESARIAS PARA MONGODB
npm install express mongoose body-parser

express: Framework para crear aplicaciones en Node.js. |  mongoose: ODM (Object Data Modeling) para MongoDB, que facilita la interacción con la base de datos.
body-parser: Middleware para analizar las solicitudes HTTP (específicamente para analizar datos JSON en el cuerpo de las solicitudes).
------------------------------------------------------------------------------------------------------------------------
EN LA CARPETA PRINCIPAL DEL PROYECTO,EN ESTE CASO mf0493_3_mongodb_david_moral CREAREMOS UN ARCHIVO server.js QUE ES EL QUE CONTENDRA LAS FUNCIONES NECESARIAS PARA SU FUNCIONAMIENTO
ADJUNTO CODIGO
------------------------------------------------------------------------------------------------------------------------
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
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

------------------------------------------------------------------------------------------------------------------------
A CONTINUACION VEMOS LA ESTRUCTURA QUE DEBE DE TENER EL PROYECTO

				tienda-en-linea/
				├── node_modules/
				├── package.json
				├── server.js
				└── package-lock.json

------------------------------------------------------------------------------------------------------------------------
POR ULTIMO INICIAMOS EL SERVIDOR PARA PROBARLO
node server.js
------------------------------------------------------------------------------------------------------------------------
AHORA MEDIANTE POSTMAN PODEMOS PROBAR SI FUNCIONA
------------------------------------------------------------------------------------------------------------------------
METODO POST (PARA AGREGAR PRODUCTOS)
URL: http://localhost:3000/productos

LA SIGUIENTE LINEA ES EL FORMATO QUE TENEMOS QUE INTRODUCIR,PRIMERO VEREMOS BODY,LO CLICKAMOS,DENTRO DE BOY VEREMOS LA OPCION RAW,AL ELEGIR RAW A LA DERECHA POR DEFECTO VEREMOS TEXT EN UN DESPLEGABLE,LO CAMBIAMOS POR JSON Body/raw/JSON
VEREMOS TAMBIEN UN RECUADRO QUE ES DONDE TENDREMOS QUE ESCRIBIR LA OPERACION,PODEMOS SIMPLEMENTE COPIAR LO SIGUIENTE PARA LA PRUEBA
------------------------------------------------------------------------------------------------------------------------
{
  "nombre": "Camiseta",
  "precio": 15.99,
  "categoria": "Ropa",
  "descripcion": "Camiseta de algodón"
}
------------------------------------------------------------------------------------------------------------------------
PULSAMOS SEND
SI TODO ESTA CORRECTO,EN LA PARTE INFERIOR VEREMOS UN RECUADRO CON 3 OPCIONES ,PRETTY|RAW|PREVIEW
EN ALGUNOS CASOS ES POSIBLE QUE EN PRETTY NO SE VEA NADA,PODEMOS CAMBIAR A RAW POR EJEMPLO Y DEBERIAMOS VER ALGO SIMILAR A ESTO
{"nombre":"Camiseta","precio":15.99,"categoria":"Ropa","descripcion":"Camiseta de algodón","_id":"67347f297485bfcd51b94887","__v":0}
SI LO VEMOS ES QUE TODO HA FUNCIONADO CORRECTAMENTE
------------------------------------------------------------------------------------------------------------------------
Método: GET (PARA VER LOS PRODUCTOS)
URL: http://localhost:3000/productos
------------------------------------------------------------------------------------------------------------------------

PULSAMOS SEND
Y YA DEBERIA MOSTRARNOS LOS PRODUCTOS
LO VEREMOS DE LA MISMA MANERA QUE HEMOS CONFIRMADO EN EL PASO ANTERIOR QUE ESTABA CORRECTO
------------------------------------------------------------------------------------------------------------------------
