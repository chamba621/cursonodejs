'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

var api = express.Router();
var middlewareAuth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var middlewareUpload = multipart({uploadDir:'./uploads/animals'});

api.get('/pruebas-animales', middlewareAuth.ensureAuth, AnimalController.pruebas);
api.post('/animal', middlewareAuth.ensureAuth, AnimalController.saveAnimal);

module.exports = api;