import React, { Component } from 'react';
import { 
    View,
    Text,
    Image,
    Alert,
    TextInput,
    StyleSheet,    
    ImageBackground,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import firebase from './FirebaseConnection';
import { NavigationActions, StackActions } from 'react-navigation';

import { checkLoginError } from '../redux/actions/AuthActions';

export class Login extends Component {

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

    if(state.email != '' && state.senha != '') {

      firebase.auth().signInWithEmailAndPassword(state.email, state.senha)
      .catch((error) => {        
        this.props.checkLoginError(error.code); 
      });

    }else {
      Alert.alert('Ops!', 'Todos os campos são obrigatórios!');
    }
    
  } 

  render() { 

    return(      
      <ImageBackground source={ require('../../assets/images/background/background.png') } style={ styles.background }  >                  
        
        <View style={ styles.logoArea } >
          <Text style={ styles.appTitle } >ReservMe</Text>
          <Image source={require('../../assets/images/logo/logo_branca_transparente.png')} style={ styles.logo } />
        </View>

        <View style={ styles.container } >   
  
          <View style={ styles.inputArea } >
            <TextInput style={ styles.input } placeholder={ this.props.email } onChangeText={(email) => { this.setState({ email })} } />
            <TextInput style={ styles.input } placeholder={ this.props.senha } secureTextEntry={ true } onChangeText={(senha) => { this.setState({ senha })} } />
          </View>
          
          <View style={ styles.btnArea } >
            <TouchableHighlight style={ styles.btnEntrar } onPress={ this.login } underlayColor='transparent' >
                <Text style={ styles.txtEntrar } >ENTRAR</Text>
            </TouchableHighlight>  
          
            <TouchableHighlight style={ styles.btnCadastrarAre} onPress={ this.cadastro } underlayColor='transparent' >
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
      width: 300,       
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
    },
    logoArea: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    logo: {
      width: 100,
      height: 100,
      marginTop: 60,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      
    },
    appTitle: {
      color: '#FFFFFF',
      fontSize: 35,
      marginTop: 40,
      textAlign: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
    },
    inputArea: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    btnCadastrarAre: {
      marginTop: 15
    }
});  

// Pegando o que está na store 
const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    senha: state.auth.senha
  };
};

// Conectando a classe com o redux
const LoginConnect = connect(mapStateToProps, { checkLoginError })(Login);

export default LoginConnect;