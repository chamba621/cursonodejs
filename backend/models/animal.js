'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnimalSchema = Schema({
	name: String,
	description: String,
	year: Number,
	image: String,
	user: {type: Schema.objectId, ref: 'User'}
});


module.exports = mongoose.model('Animal', AnimalSchema);