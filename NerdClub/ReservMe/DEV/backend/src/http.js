const responses = {
    'success': { code: 200, message: 'OK' },
    'forbidden': { code: 403, message: 'Forbidden access'}, 
    'bad-request': { code: 400, message: 'Invalid Request' },
    'internal-error': { code: 500, message: 'Ops, something went wrong' }
}

const clientBadResponses = {
    'invalid-sex': { code: 400, message: 'Invalid sex supplied' },
    'invalid-cpf': { code: 400, message: 'Invalid CPF supplied' },
    'invalid-name': { code: 400, message: 'Name must contain only letters' },
    'invalid-email': { code: 400, message: 'Invalid email supplied' },  
    'invalid-phone': { code: 400, message: 'Invalid phone number' },
    'invalid-password': { code: 400, message: 'Password must contain at least 8 characters' },
    'different-password': { code: 400, message: 'Passwords do not match' },
    'email-already-exist': { code: 400, message: 'Email supplied has already been registered' },
    'client-already-exist': { code: 400, message: 'Client already exist' },
    'invalid-email-or-password': { code: 400, message: 'Invalid email/password supplied' },
}

module.exports.responses = responses;
module.exports.clientBadResponses = clientBadResponses;
