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

export default class Login extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      senha: ''
    };
    
    // Funções
    this.login = this.login.bind(this);
    this.cadastro = this.cadastro.bind(this);    

    // Listener
    firebase.auth().onAuthStateChanged((user) => {
      // Se der certo o login
      if(user) {
        // Pegando o nome do Usuario
        // firebase.database().ref('usuarios').child(user.uid).once('value').then((snapshot) => {
        //     let nome = snapshot.val().nome;
        //     alert(`Seja Bem-vindo ${ nome }!`);  
        // })

        this.props.navigation.dispatch(StackActions.reset({
          // Indicando que não existe nenhuma página antes dela
          index: 0,
          actions:[
            NavigationActions.navigate({ routeName: 'HomeContainer' })
          ]
        }));
      }
    })
    
  } 

  cadastro() {
    this.props.navigation.navigate('Cadastro');
  }

  login() {
    let state = this.state;
    firebase.auth().signInWithEmailAndPassword(state.email, state.senha)
    .catch((error) => {
      if(error.code == 'auth/wrong-password') {
        alert('[ERROR]: Email/senha inválido!');
      }else {
        alert('Todos os campos são obrigatórios!');
      }
    });
  } 

  render() { 

    return(      
      <ImageBackground source={ require('../../assets/images/background/background.png') } style={ styles.background }  >                  
        
        <View style={ styles.container } >   
  
          <TextInput style={ styles.input } placeholder='Email' onChangeText={(email) => { this.setState({ email })} } />
          <TextInput style={ styles.input } placeholder='Senha' secureTextEntry={ true } onChangeText={(senha) => { this.setState({ senha })} } />
 
          <View style={ styles.btnArea } >
            <TouchableHighlight style={ styles.btnEntrar } onPress={ this.login } underlayColor='transparent' >
                <Text style={ styles.txtEntrar } >ENTRAR</Text>
            </TouchableHighlight>  
          
            <TouchableHighlight onPress={ this.cadastro } underlayColor='transparent' >
              <Text style={ styles.txtCadastrar } >Ainda não possui uma conta?</Text>
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
      justifyContent: 'center'
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
      marginTop: 10,
      alignItems: 'center',
    },
    btnEntrar: {
      width: 130,
      height: 40,         
      alignItems: 'center',
      borderRadius: 5,        
      justifyContent: 'center',
      backgroundColor: '#C75767',
    },
    txtEntrar: {
      color: '#FFFFFF',
      fontSize: 15
    },
    txtCadastrar: {
      color: '#FFFFFF',
      fontSize: 15
    }
});  