const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

// Criando o servidor
const server = express();

// Conexão com o Banco
mongoose.connect('mongodb+srv://admin:admin@cluster0-lxjlx.mongodb.net/reservme?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen('3333');