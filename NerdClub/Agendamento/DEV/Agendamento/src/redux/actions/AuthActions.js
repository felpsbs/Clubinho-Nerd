export const checkLoginError = (errorType) => {
    return{
        type: 'checkLoginError',
        payload: {
            errorType: errorType
        }
    };
};  

export const checkCadastroError = (errorType) => {
    return{
        type: 'checkCadastroError',
        payload: {
            errorType: errorType
        }
    };
};  