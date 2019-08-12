const express = require('express');

// Funções
const ClientController = require('./control/ClientController');

// 'Roteador'
const routes = express.Router();

// Rotas
routes.post('/client', ClientController.store);// Rota para cadastrar um cliente
// routes.post('/client/login', () => {}); // Rota para Login

module.exports = routes;