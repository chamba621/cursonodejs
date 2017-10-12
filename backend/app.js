'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var animal_routes = require('./routes/animal');

//middlewares de body-parser
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());


//configurar cabeceras y cors
app.use((request, response, next) => {
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//rutas base
app.use('/api', user_routes);
app.use('/api', animal_routes);


// app.get('/probando', (request, response) => {
// 	response.status(200).send({ message:'Este es el metodo probando'});
// });


module.exports = app;