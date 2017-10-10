'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/zoo', { useMongoClient : true })
		.then(() => {
			console.log('La conexión a la bd zoo se ha realizado correctamente...');
			app.listen(port, () =>{
				console.log("El servidor local con node y express se ha iniciado correctamente...");
			});
		})
		.catch(error => console.log(error));