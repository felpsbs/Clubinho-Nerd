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
import { connect } from 'react-redux';
import firebase from './FirebaseConnection';
import { NavigationActions, StackActions } from 'react-navigation';

export class Cadastro extends Component {

  static navigationOptions = {
    title: 'Cadastro',
    headerStyle: {
        backgroundColor: '#DE6365',
        fontSize: 50,
    },
    headerTitleStyle: {
        fontSize: 30,
        fontWeight: "200"
    },
    headerTintColor: '#FFFFFF'
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
  } 

  cadastrar() {
    let state = this.state;
    if(state.nome != '' && state.email != '') {
        // Listener
        firebase.auth().onAuthStateChanged((user) => {
            // Se foi cadastrado com sucesso
            if(user) {
                // Colocando//conectando esse usuario com o BD
                firebase.database().ref('usuarios').child(user.uid).set({
                    nome: state.nome                
                });
                // Voltando para tela de Login após o cadastro
                this.props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [  
                        NavigationActions.navigate({ routeName: 'HomeContainer' })
                    ]
                }));
            }
        });

        firebase.auth().createUserWithEmailAndPassword(state.email,state.senha)
        .catch((error) => {
            alert(`[ERROR]: ${ error.code }`)
        })
    }else {
        alert('Todos os campos são obrigatórios!')
    }
     
  } 

  render() { 

    return(    
        <ImageBackground source={ require('../../assets/images/background/background.png') } style={ styles.background }  >    
        
            <View style={ styles.container } > 

                <TextInput style={ styles.input } placeholder={ this.props.nome } onChangeText={(nome) => { this.setState({ nome })} } />               
                <TextInput style={ styles.input } placeholder={ this.props.email } onChangeText={(email) => { this.setState({ email })} } />
                <TextInput style={ styles.input } placeholder={ this.props.senha } secureTextEntry={ true } onChangeText={(senha) => { this.setState({ senha })} } />
                
                <View style={ styles.btnArea } >
                    <TouchableHighlight style={ styles.btnCadastrar } onPress={ this.cadastrar } underlayColor='transparent'>
                        <Text style={ styles.txtCadastrar } >CADASTRAR</Text>
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
        marginTop: 10,
        alignItems: 'center',
    },
    btnCadastrar: {
        width: 130,
        height: 40,         
        alignItems: 'center',
        borderRadius: 5,        
        justifyContent: 'center',
        backgroundColor: '#C75767',
    },
    txtCadastrar: {
        color: '#FFFFFF',
        fontSize: 15
    }
});  

// Pegando o que está na store 
const mapStateToProps = (state) => {
    return{
        email: state.auth.email,
        senha: state.auth.senha,
        nome: state.auth.nome
    };
};

// Conectando a classe com o redux
const CadastroConnect = connect(mapStateToProps)(Cadastro);

export default CadastroConnect;