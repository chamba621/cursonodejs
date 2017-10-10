'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secretKey = "TengoMuchoSuenoSonLas10y58";

exports.ensureAuth = function(request, response, next){
	if(!request.headers.authorization)
	{
		return response.status(403).send({message:'La peticion no tiene la cabecera de autenticación'});
	}
	else
	{
		var token = request.headers.authorization.replace(/['"]+/g, '');

		try
		{
			var payLoad = jwt.decode(token, secretKey);
			if(payLoad.exp <= moment().unix())
			{
				response.status(401).send({message: 'El token ha expirado'});
			}
		}
		catch(exception)
		{
			response.status(401).send({message: 'El token no es valido'});
		}

		request.user = payLoad;
		next();

	}
};