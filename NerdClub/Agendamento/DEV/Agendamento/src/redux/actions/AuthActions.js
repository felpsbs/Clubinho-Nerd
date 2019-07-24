import { CHECK_LOGIN_ERROR, CHECK_CADASTRO_ERROR } from './Types';

export const checkLoginError = (errorType) => {
    return{
        type: CHECK_LOGIN_ERROR,
        payload: {
            errorType: errorType
        }
    };
};  

export const checkCadastroError = (errorType) => {
    return{
        type: CHECK_CADASTRO_ERROR,
        payload: {
            errorType: errorType
        }
    };
};  