'use strict'

//modulos
var fs = require('fs');
var path = require('path');

//modelos
var User = require('../models/user');
var Animal = require('../models/animal');

//acciones
function pruebas(request, response)
{
	response.status(200).send({
		message: 'probando desde el controlador animals y la acción pruebas',
		user: request.user
	});
}

function saveAnimal(request, response)
{
	var animal = new Animal();
	var params = request.body;

	if(params.name)
	{
		animal.name = params.name;
		animal.description = params.description;
		animal.year = params.year;
		animal.image = null;
		animal.user = request.user.sub;

		animal.save((error, animalStored) => {
			if(error)
			{
				response.status(500).send({message: "Error del servidor"});
			}
			else
			{
				if(!animalStored)
				{
					response.status(404).send({message: "Error al agregar el animal"});
				}
				else
				{
					response.status(200).send({animal: animalStored});
				}
			}
		});
	}
	else
	{
		response.status(404).send({message: "El nombre del animal es obligatorio"});
	}

}

module.exports = {
	pruebas,
	saveAnimal
};