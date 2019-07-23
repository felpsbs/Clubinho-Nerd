const initialState = {
    nome: 'Nome',
    senha: 'Senha',
    email: 'exemplo@exemplo.com',
    errorMessage: '',
};

const AuthReducer = (state = [], action) => {

    // Verificando inicialmente os campos
    if(state == 0) {
        return initialState;
    }

    if(action.type == 'checkLoginError') {
        getErrorMessage(action.payload.errorType, loginErrors);        
        return initialState;  
    }

    if(action.type == 'checkCadastroError') {
        getErrorMessage(action.payload.errorType, cadastroErrors);
        return initialState;
    }

    return state;
};

const loginErrors = [
    
    { type: 'auth/wrong-password', message: '[ERROR]: Email/Senha inválidos!' },
    { type: 'auth/invalid-email',  message: '[ERROR]: Email/Senha inválidos!' },
    { type: 'auth/user-not-found', message: '[ERROR]: Usuário não encontrado!' },

];

const cadastroErrors = [
    
    { type: 'auth/invalid-email',  message: '[ERROR]: Email inválido!' },
    { type: 'auth/weak-password',  message: '[ERROR]: Sua senha precisa ter no mínimo 6 caracteres!' },

];

function getErrorMessage(errorType, errorsList) {
    let message = `[ERROR] ${ errorType }`;

    for (var i = 0; i < errorsList.length; i++) {
        if(errorsList[i].type == errorType) {
            message = errorsList[i].message;
        }
     }

     alert(message);
        
};


export default AuthReducer;