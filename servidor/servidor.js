//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
const routes = require('./config/routes')
var cors = require('cors');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//rutas
routes(app)

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

