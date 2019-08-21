const http = require('./http')

const result = false;

module.exports = {

    validateName(name) {
        // Expressão regular que só aceita letras e espaços
        const pattern = /^[a-zA-Z ]+$/;
        let result = false; 
        result = name.match(pattern) ? true : false;    
        return result;  
    },  

    validateSex(sex) {
        let result = false;
        result = sex == 'Masculino' || sex == 'Feminino' ? true : false;
        return result;
    },

    validateEmail(email) {
        const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let result = false;
        result = email.match(pattern) ? true : false;    
        return result;  
    },

    validadeCPF(cpf) {
        const length = 14;
        let result = false;
        result = cpf.length == length ? true : false;     
        return result;
    },
    
    validadePhone(phone) {
        const length = 19;
        let result = false;
        result = phone.length == 19 ? true : false ;
        return result
    },  

    validatePassword(password) {
        // tem que ter no mínimo 8 e só pode conter letra e número
        const pattern = /^[0-9a-zA-Z]{8,}$/;
        let result = false;
        result = password.match(pattern) ? true : false;
        return result; 
    },

    validatePasswordConfirmed(password, passwordConfirmed) {    
        let result = false;
        result = password == passwordConfirmed ? true : false    
        return result;    
    },

    validadePerfil(perfil) {
        let result = true;
        result = perfil == '' ? false : true ;    
        return result;
    },

    validateSignUp(body) {
        let result = true;
        message = '';
        
        if(!this.validateName(body.name) && message == '') {
            result = false;
            message = http.clientBadResponses['invalid-name'];       
        }
        if(!this.validateSex(body.sex) && message == '') {
            result = false;            
            message = http.clientBadResponses['invalid-sex'];     
        }
        if(!this.validateEmail(body.email) && message == '') {
            result = false;
            message = http.clientBadResponses['invalid-email'];     
        }
        if(!this.validadeCPF(body.cpf) && message == '') {
            result = false;
            message = http.clientBadResponses['invalid-cpf'];          
        }
        if(!this.validadePhone(body.phone) && message == '') {
            result = false;            
            message = http.clientBadResponses['invalid-phone'];
        }
        if(!this.validatePassword(body.password) && message == '') {
            result = false;             
            message = http.clientBadResponses['invalid-password'];     
        }
        if(!this.validatePasswordConfirmed(body.password, body.passwordConfirmed) && message == '') {
            result = false;               
            message = http.clientBadResponses['different-password'];  
        }
        if(!this.validadePerfil(body.perfil) && message == '') {
            result = false;
            message = http.clientBadResponses['invalid-perfil'];        
        }

        return { result: result, message: message };
    },

    validateLogin(body) {
        let result = true;
        let message = '';

        if(!this.validateEmail(body.email) && message == '') {
            result = false;
            message = http.clientBadResponses['invalid-email'];     
        }
        if(!this.validatePassword(body.password) && message == '') {
            result = false;
            message = http.clientBadResponses['invalid-password'];        
        }
        if(!this.validadePerfil(body.perfil) && message == '') {
            result = false;
            message = http.clientBadResponses['invalid-perfil'];        
        }

        return { result: result, message: message };
    }
}