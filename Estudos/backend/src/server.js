// cria um 'servidor'
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes  = require('./routes');

const httpServer = express();
// para aceitar conexões htpp e web socket
const server = require('http').Server(httpServer);
// Para receber requisições sockets
const io = require('socket.io')(server);

const connectedUsers = {};

// recebendo a conexão entre o front e o back através de socket
io.on('connection', socket => {
    // pegando o id do user na query
    const { user } = socket.handshake.query;

    connectedUsers[user] = socket.id;   
});

// Conexão com o  BD
mongoose.connect('mongodb+srv://admin:admin@cluster0-lxjlx.mongodb.net/bdcursos?retryWrites=true&w=majority', {
    useNewUrlParser: true
});
 
// para disponibilizar as informações para o resto da aplicação
httpServer.use((request, reply, next) => {
    // adicionando informações ao request
    request.io = io;
    request.connectedUsers = connectedUsers;

    return next();
});

httpServer.use(cors());
httpServer.use(express.json());
httpServer.use(routes);

server.listen(3333);
// httpServer.listen(3333);

// Para criar o package json no node usamos node init -y