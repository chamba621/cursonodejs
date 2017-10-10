'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var middlewareAuth = require('../middlewares/authenticated');

api.get('/pruebas-del-controlador', middlewareAuth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);
api.put('/update-user/:id', middlewareAuth.ensureAuth, UserController.updateUser);


module.exports = api;