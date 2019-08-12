// Para requisição à APIs externas
const axios = require('axios');
const Dev = require('../models/Dev');   

module.exports = {
    async index(request, reply) {
        const { user } = request.headers;

        const loggedDev = await  Dev.findById(user);

        const users = await Dev.find({
            $and: [ 
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev.likes }  },
                { _id: { $nin: loggedDev.dislikes }  }
            ]
        });

        return reply.json(users);

    },

    // toda vez que usa o await, tem que usar async
    async store(request, reply) {
        const { username } = request.body;

        // Verificando se o usuário já existe
        const userExists = await Dev.findOne({ user: username });
        if(userExists) {
            return reply.json(userExists);
        }

        // axios.get é assincrono, demora um pouco
        const response = await axios.get(`https://api.github.com/users/${username}`); 

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        });

        return reply.json(dev);
    }
};


// Boas práticas de um controller
    /* 
        index = faz uma lista do recurso
        show = retornar um único recurso
        store = para guardar/salvar um recurso
        update = atualizar
        delete = deletar
    */ 