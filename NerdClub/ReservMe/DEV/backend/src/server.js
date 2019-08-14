const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const database = require('./database');

// Conexão com o Banco
database.startConnection();

// Criando o servidor
console.log('[DEBUG]: Starting server...');
const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen('3333');