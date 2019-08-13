const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    perfil: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = model('Client', ClientSchema);
