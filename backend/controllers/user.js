'use strict'

//modulos
var bcrypt = require('bcrypt-nodejs');

//modelos
var User = require('../models/user');

//servicios
var jwt = require('../services/jwt');

//acciones
function pruebas(request, response)
{
	response.status(200).send({
		message: 'probando desde el controlador user y la acción pruebas'
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
							//devolver token jwt
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

module.exports = {
	pruebas,
	saveUser,
	login
}