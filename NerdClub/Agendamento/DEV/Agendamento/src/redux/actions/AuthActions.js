export const checkError = (errorType) => {
    return{
        type: 'checkError',
        payload: {
            errorType:errorType
        }
    };
};  