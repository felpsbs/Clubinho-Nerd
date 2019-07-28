import { Alert } from 'react-native';
import { CHECK_LOGIN_ERROR, CHECK_CADASTRO_ERROR } from '../actions/Types';

const initialState = {
    cpf: 'Cpf',
    nome: 'Nome Completo',
    senha: 'Senha',
    email: 'exemplo@exemplo.com',
    celular: 'Celular',
    senhaConfirmacao: 'Digite novamente a senha' 
};

const AuthReducer = (state = [], action) => {

    // Verificando inicialmente os campos
    if(state == 0) {
        return initialState;
    }

    if(action.type == CHECK_LOGIN_ERROR) {
        getErrorMessage(action.payload.errorType, loginErrors);        
        return initialState;  
    }

    if(action.type == CHECK_CADASTRO_ERROR) {
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

    Alert.alert('Ops!', message);
        
};

export default AuthReducer;    