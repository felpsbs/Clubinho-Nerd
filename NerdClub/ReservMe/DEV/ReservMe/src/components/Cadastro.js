import React, { Component } from 'react';
import { 
    View,
    Text,
    Alert,
    TextInput,
    StyleSheet,
    ImageBackground,
    TouchableHighlight,
    Picker
} from 'react-native';
import { connect } from 'react-redux';
import firebase from './FirebaseConnection';
import { NavigationActions, StackActions } from 'react-navigation';

import { checkCadastroError } from '../redux/actions/AuthActions';

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
      senha: '',
      senhaConfirmacao: '',
      sexo: '',
      sexos: [
          {sexo: 'Sexo', value: 'Sexo'},  //Fazer função para nao permitir que 'sexo' seja marcado na hora de cadastrar - so pode ser valido "feminino" e 'masculino
          {sexo: 'Feminino', value: 'Feminino'},
          {sexo: 'Masculino', value: 'Masculino'},

      ],
      celular: '',
      cpf: '',
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
                // Colocando/conectando esse usuario com o BD
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

        // Cadastrando no sistema de email e senha
        firebase.auth().createUserWithEmailAndPassword(state.email,state.senha)
        .catch((error) => {
            this.props.checkCadastroError(error.code)
        })

    }else {
        Alert.alert('Ops!', 'Todos os campos são obrigatórios!');
    }
     
  } 




  render() { 
  
    let sexosItem = this.state.sexos.map((v, k) => {
        return <Picker.Item color='#1F2957'  key={k} label = {v.sexo} value = {k}/>
    });



    return(    
        <ImageBackground source={ require('../../assets/images/background/background.png') } style={ styles.background }  >    
        
            <View style={ styles.container } > 

                <TextInput style={ styles.input } placeholder={ this.props.nome } onChangeText={(nome) => { this.setState({ nome })} } />               
                <TextInput style={ styles.input } placeholder={ this.props.email } onChangeText={(email) => { this.setState({ email })} } />
                <Picker style = {styles.picker} selectedValue= {this.state.sexo} onValueChange = {(itemValue, itemIndex) => this.setState({sexo: itemValue}) }>
                    {sexosItem}
                </Picker>
                <TextInput style={ styles.input } placeholder={ this.props.cpf } onChangeText={(cpf) => { this.setState({ cpf })} } />             
                <TextInput style={ styles.input } placeholder={ this.props.celular } onChangeText={(celular) => { this.setState({ celular })} } keyboardType={"numeric"} /> 
                <TextInput style={ styles.input } placeholder={ this.props.senha } secureTextEntry={ true } onChangeText={(senha) => { this.setState({ senha })} } />
                <TextInput style={ styles.input } placeholder={ this.props.senhaConfirmacao } secureTextEntry={ true } onChangeText={(senhaConfirmacao) => { this.setState({ senhaConfirmacao })} } />

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
        marginTop: 40,
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
    },

    picker: {
        width: 350,
        height: 50,
        margin: 5,
        padding: 5,
        backgroundColor: '#FFFFFF',
    },

});  

// Pegando o que está na store 
const mapStateToProps = (state) => {
    return{
        email: state.auth.email,
        senha: state.auth.senha,
        nome: state.auth.nome,
        sexo: state.auth.sexo,
        sexos: state.auth.sexos,
        celular: state.auth.celular,
        cpf: state.auth.cpf,
        senhaConfirmacao: state.auth.senhaConfirmacao
    };
};

// Conectando a classe com o redux
const CadastroConnect = connect(mapStateToProps, { checkCadastroError })(Cadastro);

export default CadastroConnect;