const express = require('express');

// Funções
const ClientController = require('./control/ClientController');
const LoginController = require('./control/LoginController');

// 'Roteador'
const routes = express.Router();

// Rotas
routes.post('/client', ClientController.store);// Rota para cadastrar um cliente
routes.post('/client/login', LoginController.store); // Rota para Login

module.exports = routes;