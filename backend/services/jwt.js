'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secretKey = "TengoMuchoSuenoSonLas10y58";

exports.createToken = function(user){
	var payLoad = {
		sub: user._id,
		name: user.name,
		surname: user.surname,
		email: user.email,
		role: user.role,
		image: user.image,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix()
	};

	return jwt.encode(payLoad, secretKey);
};