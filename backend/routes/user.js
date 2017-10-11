'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var middlewareAuth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var middlewareUpload = multipart({uploadDir:'./uploads/users'});

api.get('/pruebas-del-controlador', middlewareAuth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);
api.put('/update-user/:id', middlewareAuth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [middlewareAuth.ensureAuth, middlewareUpload], UserController.uploadImage);
api.get('/get-image-file/:imageFile', UserController.getImageFile);
api.get('/keepers/', UserController.getKeepers);


module.exports = api;