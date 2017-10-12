'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

var api = express.Router();
var middlewareAuth = require('../middlewares/authenticated');
var middlewareAdmin = require('../middlewares/isAdmin');

var multipart = require('connect-multiparty');
var middlewareUpload = multipart({uploadDir:'./uploads/animals'});

api.get('/pruebas-animales', middlewareAuth.ensureAuth, AnimalController.pruebas);
api.post('/animal', [middlewareAuth.ensureAuth, middlewareAdmin.isAdmin], AnimalController.saveAnimal);
api.get('/animals', AnimalController.getAnimals);
api.get('/animal/:id', AnimalController.getAnimal);
api.put('/animal/:id', [middlewareAuth.ensureAuth, middlewareAdmin.isAdmin], AnimalController.updateAnimal);
api.post('/upload-image-animal/:id', [middlewareAuth.ensureAuth, middlewareAdmin.isAdmin, middlewareUpload], AnimalController.uploadImage);
api.get('/get-image-animal/:imageFile', AnimalController.getImageFile);
api.delete('/animal/:id', [middlewareAuth.ensureAuth, middlewareAdmin.isAdmin], AnimalController.deleteAnimal);

module.exports = api;