const Dev = require('../models/Dev');

module.exports = {
    async store(request, reply) {   
        const { user } = request.headers;  
        // Usuário que está recebendo o like
        const { devId } = request.params;

        // contem todas as informações dos usuários
        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev) {
            return reply.status(400).json({ error: 'Dev not exists' });   
        }

        if(targetDev.likes.includes(loggedDev._id)) {
            // socket do usuário logado / passando o id do usuário
            const loggedSocket = request.connectedUsers[user]; 
            const targetSocket = request.connectedUsers[devId];

            if(loggedSocket) {
                // dizendo para quem deve enviar a mensagem
                // avisando que deu match e as informações da pessoa
                request.io.to(loggedSocket).emit('match', targetDev);
            }

            if(targetSocket) {
                // dizendo para quem deve enviar a mensagem
                // avisando que deu match e as informações da pessoa
                request.io.to(targetSocket).emit('match', loggedDev);
            }
        }


        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return reply.json(loggedDev);
    }
};