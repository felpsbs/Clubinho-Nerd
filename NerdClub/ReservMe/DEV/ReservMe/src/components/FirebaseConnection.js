import firebase from 'firebase';

// Configurações do Banco
let firebaseConfig = {
    apiKey: "AIzaSyClGZcWnBCcHXUaU8sHFcqKrnmTizAQo8A",
    authDomain: "agendamento-48d85.firebaseapp.com",
    databaseURL: "https://agendamento-48d85.firebaseio.com",
    projectId: "agendamento-48d85",
    storageBucket: "",
    messagingSenderId: "106060848453",
    appId: "1:106060848453:web:255ead075786444b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;