const Client = require('../model/Client');
const validator = require('../validation');
const bcrypt = require('../clientPassword');
const http = require('../http');

module.exports = {
    async store(request, reply) {
        const client = request.body;

        // Verificando se o cliente já está cadastrado
        const clientExists = await Client.findOne({ email: client.email });
        if(clientExists) {
            return reply.status(400).json(http.clientBadResponses['client-already-exist']);
        }

        // Validando os campos digitados para o cadastro
        const { result, message } = validator.validateSignUp(client);
        if(!result) {
            return reply.status(400).json(message);
        }

        // Criptografando a senha do cliente
        var hashedPassword  = bcrypt.setHashPassword(client.password);

        // Cadastrando o cliente
        await Client.create({
            name: client.name,
            sex: client.sex,
            email:client.email,
            cpf: client.cpf,
            phone: client.phone,
            password: hashedPassword,
            perfil: client.perfil,
            status: true 
        });     
        
        return reply.json(http.responses['success']);
    }
};