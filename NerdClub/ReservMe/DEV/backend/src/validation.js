
module.exports = {

    validateName(name) {
        // Expressão regular que só aceita letras e espaços
        const pattern = /^[a-zA-Z ]+$/;
    
        let result = false;
        if(name.match(pattern)) {
            result = true;
        }
    
        return result;  
    },  

    validateSex(sex) {
    
        let result = false;
        if(sex == 'Masculino' || sex == 'Feminino') {
            result = true; 
        }
    
        return result ;
    },

    validateEmail(email) {
        const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        let result = false;
        if(email.match(pattern)) {
            result = true;
        }
    
        return result;  
    },

    validadeCPF(cpf) {
        const length = 14;
    
        let result = false;
        if(cpf.length == length) {
            result = true;
        }
    
        return result;
    },
    
    validadePhone(phone) {
        const length = 19;
    
        let result = false;
        if(phone.length == 19) {
            result = true;
        }
    
        return result
    },  

    validatePassword(password) {
        // tem que ter no mínimo 8 e só pode conter letra e número
        const pattern = /^[0-9a-zA-Z]{8,}$/;

        let result = false;
        if(password.match(pattern)) {
            result = true;
        }

        return result; 
    },

    validatePasswordConfirmed(password, passwordConfirmed) {    
        
        let result = false;
        if(password == passwordConfirmed) {
            result = true;
        }
    
        return result;    
    },

    validateSignUp(body) {
        let result = true;
        message = '';
        
        if(!this.validateName(body.name) && message == '') {
            result = false;
            message = 'auth/invalid-name';        
        }
        if(!this.validateSex(body.sex) && message == '') {
            result = false;
            message = 'auth/invalid-sex';          
        }
        if(!this.validateEmail(body.email) && message == '') {
            result = false;
            message = 'auth/invalid-email';        
        }
        if(!this.validadeCPF(body.cpf) && message == '') {
            result = false;
            message = 'auth/invalid-cpf';            
        }
        if(!this.validadePhone(body.phone) && message == '') {
            result = false;
            message = 'auth/invalid-cell-phone';
        }
        if(!this.validatePassword(body.password) && message == '') {
            result = false;
            message = 'auth/invalid-password';        
        }
        if(!this.validatePasswordConfirmed(body.password, body.passwordConfirmed) && message == '') {
            result = false;
            message = 'auth/different-password';        
        }

        return { result: result, message: message };
    }
}