import React, { Component } from 'react';
import {  
  StyleSheet, 
  Text, 
  View,
  TextInput,
  Button,
} from 'react-native';
import firebase from './src/components/FirebaseConnection';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      senha: ''
    };
    
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    // Listener
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        alert('Usuario logado com sucesso!');
      }
    })
    
  }

  logout() {
    firebase.auth().signOut();
    alert('Deslogado com sucesso!');
  }

  login() {
    let state = this.state;
    firebase.auth().signInWithEmailAndPassword(state.email, state.senha)
    .catch((error) => {
      if(error.code == 'auth/wrong-password') {
        alert('Dados inválidos');
      }else {
        alert('Ops, tente novamente mais tarde!');
      }
    });
  }

  render() {

    return(      
      <View style={styles.container} >  
      <Text style={{ fontSize: 30, textAlign:'center' }}>Login</Text>      
        <TextInput style={styles.input} placeholder='Email' onChangeText={(email) => {this.setState({email})} } />
        <TextInput style={styles.input} placeholder='Senha' secureTextEntry={ true } onChangeText={(senha) => {this.setState({senha})}} />

        <Button title='Entrar' onPress={this.login} />
        <Button title='Sair' onPress={this.logout} />
      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  input: {
    height: 50,
    width: 350,
    backgroundColor: '#ccc',
    fontSize: 22,
    padding: 5,
    margin: 5
  }
});