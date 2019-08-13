const Client = require('../model/Client');
const validator = require('../validation');
const b = require('../password');
const bcrypt = require('bcrypt');

module.exports = {
    async store(request, reply) {
        const client = request.body;

        // Validando os dados 
        var { result, message } = validator.validateLogin(client);
        if(!result) {
            return reply.status(400).json({ code: 400, message: message });
        }

        const clientExists = await Client.findOne({ email: client.email, perfil: client.perfil, status: true });   
        
        let match = false; 
        if(clientExists !== null) {

            await bcrypt.compare(client.password, clientExists.password).then((valor) => {
                match = valor;
            });
   
        }

        if(!match) {
            return reply.status(400).json({ code: 400, message: 'Invalid email/password' });
        }
  
        return reply.json({ code: 200, message: 'OK' });
    }
};