'use strict'

//modulos
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');

//modelos
var User = require('../models/user');

//servicio jwt
var jwt = require('../services/jwt');

//acciones
function pruebas(request, response)
{
	response.status(200).send({
		message: 'probando desde el controlador user y la acción pruebas',
		user: request.user
	});
}

function saveUser(request, response)
{
	//se crea una instancia usuario
	var user = new User();
	//recoger parametros de la peticion
	var params = request.body;
	if(params.password && params.name && params.surname && params.email)
	{
		//setear valores al usuario
		user.name = params.name;
		user.surname = params.surname;
		user.email = params.email;
		user.role = 'ROLE_USER';
		user.image = null;

		User.findOne({email: user.email.toLowerCase()}, (error, userFind) => {
			if(error)
			{
				response.status(500).send({message: "Error al comprobar el usuario"});
			}
			else
			{
				if(!userFind)
				{
					//cifrar contrasenia
					bcrypt.hash(params.password, null, null, function(error, hash){
						user.password = hash;
						//almacenar usuario
						user.save( (error, userStored) => {
							if(error)
							{
								response.status(500).send({message: "Error al guardar el usuario"});
							}
							else
							{
								if(!userStored)
								{
									response.status(404).send({message: "No se ha regsitrado el usuario"});
								}
								else
								{
									response.status(200).send({user: userStored});
								}
							}
						});
					});
				}
				else
				{
					response.status(200).send({message:"El usuario ya existe"});					
				}

			}

		});

	}
	else
	{
		response.status(200).send({message:"Introduce los datos correctamente"});
	}
}

function login(request, response)
{
	var params = request.body;
	var email = params.email;
	var password = params.password;

	User.findOne({email: email.toLowerCase()}, (error, user) => {
		if(error)
		{
			response.status(500).send({message: "Error al comprobar el usuario"});
		}
		else
		{
			if(user)
			{
				bcrypt.compare(password, user.password, (error, check) => {
					if(check)
					{
						//comprobar y generar el token
						if(params.getToken)
						{
							response.status(200).send({token: jwt.createToken(user)});
						}
						else
						{
							response.status(200).send({user});
						}
					}
					else
					{
						response.status(404).send({message: "La contraseña no coincide con el usuario"});
					}
				})
			}
			else
			{
				response.status(404).send({message: "El usuario no se encuentra registrado"});
			}
		}
	});
}

function updateUser(request, response)
{
	var userId = request.params.id;
	var update = request.body;

	if(userId != request.user.sub)
	{
		return response.status(500).send({message:'No tienes permiso para actualizar este usuario'});
	}

	User.findByIdAndUpdate(userId, update, {new: true}, (error, userUpdated) => {
		if(error)
		{
			response.status(500).send({message:'Error al actualizar usuario'});
		}
		else
		{
			if(!userUpdated)
			{
				response.status(404).send({message: 'No se ha podido actualizar el usuario'});
			}
			else
			{
				response.status(200).send({user: userUpdated});
			}
		}
	});
}

function uploadImage(request, response)
{	
	var userId = request.params.id;
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
			if(userId != request.user.sub)
			{
				return response.status(500).send({message:'No tienes permiso para actualizar este usuario'});
			}

			User.findByIdAndUpdate(userId, {image: fileName}, {new: true}, (error, userUpdated) => {
				if(error)
				{
					response.status(500).send({message:'Error al actualizar usuario'});
				}
				else
				{
					if(!userUpdated)
					{
						response.status(404).send({message: 'No se ha podido actualizar el usuario'});
					}
					else
					{
						response.status(200).send({user: userUpdated, image: fileName});
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
	var pathFile = './uploads/users/'+imageFile;

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

function getKeepers(request, response)
{
	User.find({role: 'ROLE_ADMIN'}).exec((error, users) => {
		if(error)
		{
			response.status(500).send({message: "Error en la peticion"});
		}
		else
		{
			if(!users)
			{
				response.status(404).send({message: "No hay cuidadores"});
			}
			else
			{
				response.status(200).send({users});
			}
		}
	});

}

module.exports = {
	pruebas,
	saveUser,
	login,
	updateUser,
	uploadImage,
	getImageFile,
	getKeepers
}