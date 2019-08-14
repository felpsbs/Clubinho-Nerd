const bcrypt = require('bcrypt');

module.exports = {
 
    setHashPassword(password) {
        var salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },

    comparePassword(inputPassword, hashedPassword) {
        return bcrypt.compare(inputPassword, hashedPassword);
    }

}