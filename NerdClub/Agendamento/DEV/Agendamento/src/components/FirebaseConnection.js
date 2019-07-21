import firebase from 'firebase';

// Configurações do Banco
let firebaseConfig = {
    apiKey: "AIzaSyAckYBQMht9ZjwFbab6b8Ei20BAu2U56s0",
    authDomain: "meuapp-8f39a.firebaseapp.com",
    databaseURL: "https://meuapp-8f39a.firebaseio.com",
    projectId: "meuapp-8f39a",
    storageBucket: "",
    messagingSenderId: "1042888736460",
    appId: "1:1042888736460:web:ee0a9bc87f7bd9a3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;