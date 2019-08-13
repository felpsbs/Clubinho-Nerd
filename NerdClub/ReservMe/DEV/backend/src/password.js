const bcrypt = require('bcrypt');

module.exports = {
 
    setHashPassword(password) {
        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(password, salt);
        
        return hashPassword;
    },

    comparePassword(inputPassword, hashedPassword) {
        return bcrypt.compare(inputPassword, hashedPassword);
    }

}