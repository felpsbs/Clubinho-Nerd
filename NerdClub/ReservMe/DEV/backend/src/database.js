const mongoose = require('mongoose');
const config = require('./config');

module.exports = {

    startConnection() {
        console.log('[DEBUG]: Starting database connection...');
        const bd = mongoose.connect(config.MONGO_HOST, {
            useNewUrlParser: true
        });
    }
};