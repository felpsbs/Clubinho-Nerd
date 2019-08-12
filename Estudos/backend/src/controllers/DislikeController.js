const Dev = require('../models/Dev');

module.exports = {
    async store(request, reply) {

        const { user } = request.headers;  
        // Usuário que está recebendo o like
        const { devId } = request.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev) {
            return reply.status(400).json({ error: 'Dev not exists' });   
        }

        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save();

        return reply.json(loggedDev);
    }
};