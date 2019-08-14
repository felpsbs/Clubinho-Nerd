const Client = require('../model/Client');
const validator = require('../validation');
const bcrypt = require('../clientPassword');
const http = require('../http');

module.exports = {
    async store(request, reply) {
        const client = request.body;

        // Validando os dados 
        var { result, message } = validator.validateLogin(client);
        if(!result) {
            return reply.status(400).json(message);
        }
        // Procurando um cliente com o email informado
        const clientExists = await Client.findOne({ email: client.email, perfil: client.perfil, status: true });   
        
        let match = false; 
        if(clientExists !== null) {
            // Comparando as senhas
            match = await bcrypt.comparePassword(client.password, clientExists.password);
        }

        // Se as senhas não forem iguais
        if(!match) {
            return reply.status(400).json(http.clientBadResponses['invalid-email-or-password']);
        }

        return reply.json(http.responses['success']);
    }
};