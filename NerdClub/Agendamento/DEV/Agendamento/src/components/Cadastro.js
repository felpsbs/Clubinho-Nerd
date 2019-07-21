import React, { Component } from 'react';
import { 
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    ImageBackground,
    TouchableHighlight
} from 'react-native';
import firebase from './FirebaseConnection';
import { NavigationActions, StackActions } from 'react-navigation';

export default class Cadastro extends Component {

  static navigationOptions = {
    title: 'Cadastro',
  };

  constructor(props) {
    super(props);

    this.state = {
      nome: '',
      email: '',
      senha: ''
    };
    
    this.cadastrar = this.cadastrar.bind(this);    

    // Primeiro verifica se tem algum usuario logado, se tiver tira ele
    firebase.auth().signOut();

    // Listener
    firebase.auth().onAuthStateChanged((user) => {
        // Se foi cadastrado com sucesso
        if(user) {
            // Colocando//conectando esse usuario com o BD
            firebase.database().ref('usuarios').child(user.uid).set({
                nome: this.state.nome                
            });
            // Voltando para tela de Login após o cadastro
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Login' })
                ]
            }));
        }
    });
    
  } 

  cadastrar() {
    let state = this.state;
    firebase.auth().createUserWithEmailAndPassword(
        state.email,
        state.senha
    ).catch((error) => {
        alert(`[ERROR]: ${ error.code }`)
    })
    
  } 

  render() { 

    return(    
        <ImageBackground source={ require('../../assets/images/background/background.png') } style={ styles.background }  >    
        
            <View style={ styles.container } > 
              
                <TextInput style={ styles.input } placeholder='Nome' onChangeText={(nome) => { this.setState({ nome })} } />               
                <TextInput style={ styles.input } placeholder='Email' onChangeText={(email) => { this.setState({ email })} } />
                <TextInput style={ styles.input } placeholder='Senha' secureTextEntry={ true } onChangeText={(senha) => { this.setState({ senha })} } />
                
                <View style={ styles.btnArea } >
                    <TouchableHighlight style={ styles.btnCadastrar } onPress={ this.cadastrar } >
                        <Text style={ styles.textCadastrar } >CADASTRAR</Text>
                    </TouchableHighlight>  
                </View>

            </View>

        </ImageBackground>
    );
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        width: 350,
        height: 50,
        margin: 5,
        padding: 5,
        fontSize: 22, 
        backgroundColor: '#FFFFFF',
    },
    background:{
        flex: 1,
        width: null
    },
    btnArea: {        
        width: 130,
        height: 40,         
        alignItems: 'center',
        borderRadius: 5,        
        justifyContent: 'center',
        backgroundColor: '#C75767',
    },
    btnCadastrar: {

    },
    textCadastrar: {
        color: '#FFFFFF',
        fontSize: 15
    },
});  