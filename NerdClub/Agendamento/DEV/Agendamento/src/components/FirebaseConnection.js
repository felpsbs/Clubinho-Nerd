import firebase from 'firebase';

// Configurações do Banco
let firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
