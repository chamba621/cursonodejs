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

function getAnimals(request, response)
{
	Animal.find({}).populate({path: 'user'}).exec((error, animals) => {
		if(error)
		{
			response.status(500).send({message: "Error en la petición"});
		}
		else
		{
			if(!animals)
			{
				response.status(404).send({message: "No hay animales"});
			}
			else
			{
				response.status(200).send({animals});
			}
		}
	});
}

function getAnimal(request, response)
{
	var animalId = request.params.id;

	Animal.findById(animalId).populate({path: 'user'}).exec((error, animal) => {
		if(error)
		{
			response.status(500).send({message: "Error en la petición"});
		}
		else
		{
			if(!animal)
			{
				response.status(404).send({message: "El animal no existe"});
			}
			else
			{
				response.status(200).send({animal});
			}
		}
	});

}

function updateAnimal(request, response)
{
	var animalId = request.params.id;
	var update = request.body;

	Animal.findByIdAndUpdate(animalId, update, {new: true}, (error, animalUpdated) => {
		if(error)
		{
			response.status(500).send({message: "Error en la petición"});
		}
		else
		{
			if(!animalUpdated)
			{
				response.status(404).send({message: 'No se ha podido actualizar el animal'});
			}
			else
			{
				response.status(200).send({animalUpdated});
			}
		}
	});
}

function uploadImage(request, response)
{	
	var animalId = request.params.id;
	var fileName = 'No subido ...';

	if(request.files)
	{
		var filePath = request.files.image.path;
		var arrayNameFile = filePath.split('\\');
		var fileName =arrayNameFile[2];
		var arrayName = fileName.split("\.");
		var extension = arrayName[1].toLowerCase();

		if(extension == "png" || extension == "jpeg"  || extension == "jpg" || extension == "gif")
		{
			/*if(animalId != request.user.sub)
			{
				return response.status(500).send({message:'No tienes permiso para actualizar este animal'});
			}*/

			Animal.findByIdAndUpdate(animalId, {image: fileName}, {new: true}, (error, animalUpdated) => {
				if(error)
				{
					response.status(500).send({message:'Error en la petición'});
				}
				else
				{
					if(!animalUpdated)
					{
						response.status(404).send({message: 'No se ha podido actualizar el animal'});
					}
					else
					{
						response.status(200).send({animal: animalUpdated, image: fileName});
					}
				}
			});
		}
		else
		{
			fs.unlink(filePath, (error) => {
				if(error)
				{
					response.status(200).send({message:"No es una extension valida y fichero no borrado"});
				}
				else
				{
					response.status(200).send({message:"No es una extension valida"});
				}
			
			});
		}

		//response.status(200).send({filePath:filePath,arrayNameFile:arrayNameFile,fileName:fileName});
	}
	else
	{
		response.status(200).send({message:"No se ha enviado ningun archivo"});
	}
}

function getImageFile(request, response)
{
	var imageFile = request.params.imageFile;
	var pathFile = './uploads/animals/'+imageFile;

	fs.exists(pathFile, function(exists){
		if(exists)
		{
			response.sendFile(path.resolve(pathFile));
		}
		else
		{
			response.status(404).send({message: "No se encontro la imagen"});
		}
	});
}

function deleteAnimal(request, response)
{
	var animalId = request.params.id;
	Animal.findByIdAndRemove(animalId, (error, animalRemoved) => {
		if(error)
		{
			response.status(500).send({message:'Error en la petición'});
		}
		else
		{
			if(!animalRemoved)
			{
				response.status(404).send({message: 'No se ha podido eliminar el animal'});
			}
			else
			{
				response.status(200).send({animal: animalRemoved});
			}
		}
	});
}

module.exports = {
	pruebas,
	saveAnimal,
	getAnimals,
	getAnimal,
	updateAnimal,
	uploadImage,
	getImageFile,
	deleteAnimal
};