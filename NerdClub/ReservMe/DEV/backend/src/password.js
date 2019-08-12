const bcrypt = require('bcrypt');

module.exports = {
 
    setHashPassword(password) {
        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(password, salt);
        
        return hashPassword;
    },

    // async comparePassword(inputPassword, hashedPassword) {
    //     const match = await bcrypt.compare(inputPassword, hashedPassword);
    //     return match;
    // }

}