import React, { Component } from 'react';
import { 
    View,
    Text,
    Modal,
    Image,
    Alert,
    CheckBox,
    TextInput,
    StyleSheet,    
    ImageBackground,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import firebase from './FirebaseConnection';
import { NavigationActions, StackActions } from 'react-navigation';

import { checkLoginError } from '../redux/actions/AuthActions';
import Error from './Error';

export class Login extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      senha: '',
      checkBoxes:[
        // 0 = cliente, 1 = profissional, 2= admin
        { id: 0, checked: false, disable: false },
        { id: 1, checked: false, disable: false },
        { id: 2, checked: false, disable: false }
      ],
      modalMessage: '',
      modalVisible: false,
    };
    
    // Funções
    this.login = this.login.bind(this);
    this.cadastro = this.cadastro.bind(this);   
    this.fecharModal = this.fecharModal.bind(this);
    this.setCheckBoxChecked = this.setCheckBoxChecked.bind(this); 
    

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

  fecharModal() {
    let state = this.state;
    state.modalVisible = false;
    this.setState(state);
  }

  setCheckBoxChecked(id, value) {
    let state = this.state;

    if(id == 0) {
      state.checkBoxes[id].checked = value;
      state.checkBoxes[1].disable = value;
      state.checkBoxes[2].disable = value;
    } 
    if(id == 1) {
      state.checkBoxes[id].checked = value;
      state.checkBoxes[0].disable = value;
      state.checkBoxes[2].disable = value;
    }
    if(id == 2) {
      state.checkBoxes[id].checked = value;
      state.checkBoxes[0].disable = value;
      state.checkBoxes[1].disable = value;
    }
    
    this.setState(state);
  }

  cadastro() {
    this.props.navigation.navigate('CadastroCliente');
  }

  login() {
    let state = this.state;
    
    if(state.email != '' && state.senha != '') {

      firebase.auth().signInWithEmailAndPassword(state.email, state.senha)
      .catch((error) => {  
        state.modalVisible = true;
        state.modalMessage = error.code;
        this.setState(state);      
        // this.props.checkLoginError(error.code); 
      });

    }else {
      state.modalVisible = true;
      state.modalMessage = 'auth/required';
      this.setState(state);
      // this.props.checkLoginError('auth/required');
    }
    
  } 

  render() { 

    return(      
      <ImageBackground source={ require('../assets/images/background/background.png') } style={ styles.background }  >                  
              
        <View style={ styles.logoArea } >
          <Text style={ styles.appTitle } >ReservMe</Text>
          <Image source={require('../assets/images/logo/logo_branca_transparente.png')} style={ styles.logo } />
        </View>

        <View style={ styles.container } >   
  
          <View style={ styles.inputArea } >
            <TextInput style={ styles.input } placeholder={ this.props.email } onChangeText={(email) => { this.setState({ email })} } />
            <TextInput style={ styles.input } placeholder={ this.props.senha } secureTextEntry={ true } onChangeText={(senha) => { this.setState({ senha })} } />
          </View>

          <View style={{ alignItems:'center', justifyContent:'center', flexDirection: 'row' }} >
            
            <Text style={ styles.checkBoxText } >Quem é você?</Text>
            
            <View style={ styles.perfilArea } >
            
              <View style={styles.checkBoxArea} >              
                <CheckBox  value={ this.state.checkBoxes[0].checked } disabled={ this.state.checkBoxes[0].disable } onValueChange={(value) => this.setCheckBoxChecked(0, value)} />                 
                <Text style={ styles.checkBoxText } >Cliente</Text>
              </View>

              <View style={styles.checkBoxArea} >
                <CheckBox  value={ this.state.checkBoxes[1].checked } disabled={ this.state.checkBoxes[1].disable } onValueChange={(value) => this.setCheckBoxChecked(1, value)} />
                <Text style={ styles.checkBoxText } >Profissional</Text>
              </View>

              <View style={styles.checkBoxArea} >              
                <CheckBox  value={ this.state.checkBoxes[2].checked } disabled={ this.state.checkBoxes[2].disable } onValueChange={(value) => this.setCheckBoxChecked(2, value)} />
                <Text style={ styles.checkBoxText } >Administrador</Text>
              </View>
    
            </View>
          </View>
          
          <View style={ styles.btnArea } >
            <TouchableHighlight style={ styles.btnEntrar } onPress={ this.login } underlayColor='transparent' >
                <Text style={ styles.txtEntrar } >ENTRAR</Text>
            </TouchableHighlight>  
          
            <TouchableHighlight style={ styles.btnCadastrarAre} onPress={ this.cadastro } underlayColor='transparent' >
              <Text style={ styles.txtCadastrar } >Ainda não possui uma conta?</Text>
            </TouchableHighlight>
          </View>   

          <Modal animationType='slide' visible={ this.state.modalVisible } transparent={ true } >
            <View style={ styles.modalArea } >
              <Error fechar={ () => this.fecharModal(false) } message={ this.state.modalMessage }/>
            </View>            
          </Modal>  
          
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
  },
  perfilArea: {
    margin: 10,
    flexDirection:'column',
    alignItems: 'flex-start', 
  },
  checkBoxTextArea: {
      alignItems: 'flex-start', 
      justifyContent: 'center' 
  },
  checkBoxText: {
    color: '#FFF',
    fontSize: 18, 
  },
  checkBoxArea:  {
    flexDirection: 'row',
    justifyContent: 'center' 
  },
  modalArea: {
    flex: 1,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
});  

// Pegando o que está na store 
const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    senha: state.auth.senha,
    errorMessage: state.auth.errorMessage
  };
};

// Conectando a classe com o redux
const LoginConnect = connect(mapStateToProps, { checkLoginError })(Login);

export default LoginConnect;