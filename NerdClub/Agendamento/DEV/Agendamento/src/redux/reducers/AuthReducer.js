const initialState = {
    nome: 'Nome',
    senha: 'Senha',
    email: 'exemplo@exemplo.com',
};

const AuthReducer = (state = [], action) => {

    // Verificando inicialmente os campos
    if(state == 0) {
        return initialState;
    }

    if(action.type == 'checkError') {
        getErrorMessage(action.payload.errorType);
        return initialState;  
    }

    return state;
};

function getErrorMessage(errorType) {
    
    switch (errorType) {
        case 'auth/wrong-password':
            alert('[ERROR]: Email/Senha inválidos!');
            break;
        case 'auth/invalid-email':
            alert('[ERROR]: Email/Senha inválidos!');
            break;
        case 'auth/user-not-found':
            alert('[ERROR]: Usuário não encontrado!');
            break;    
        default:
            alert(`[ERROR]: ${ error }`);
    }
        
};


export default AuthReducer;