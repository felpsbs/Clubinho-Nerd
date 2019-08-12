import React, { Component } from 'react';
import { 
    View,
    Text,
    Modal,
    Image,
    Picker,
    CheckBox,
    TextInput,
    StyleSheet,
    ImageBackground,
    TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import firebase from '../components/FirebaseConnection';
import TextInputMask from 'react-native-text-input-mask';
import { NavigationActions, StackActions } from 'react-navigation';

import { checkCadastroError } from '../redux/actions/AuthActions';
import Error from '../components/Error';

// Images
import background from '../assets/images/background/background.png';
import logo from '../assets/images/logo/logo_branca_transparente.png';
import leftArrow from '../assets/images/icons/left-arrow.png';

export class CadastroCliente extends Component {

  static navigationOptions = {
    title: 'Cadastro',
    headerRight: (
        <Image 
            style={{ width: 40, height: 40, marginRight: 10 }} 
            source={ logo } 
        />
    ),
    headerStyle: {
        backgroundColor: '#DE6365',
        fontSize: 50,
    },
    headerTitleStyle: {
        fontSize: 30,
        fontWeight: "200"
    },
    headerTintColor: '#FFFFFF',
    headerBackImage: (
        <Image 
            style={{  width: 25, height: 25 }} 
            source={ leftArrow }
        />
    )
  };

  constructor(props) {
    super(props);

    this.state = {
        cpf: '',
        nome: '',
        sexo: '',
        email: '',
        senha: '',                
        sexos: [
            { sexo: 'Sexo', value: 'Sexo'},  //Fazer função para nao permitir que 'sexo' seja marcado na hora de cadastrar - so pode ser valido "feminino" e 'masculino
            { sexo: 'Feminino', value: 'Feminino' },
            { sexo: 'Masculino', value: 'Masculino' },
        ],
        celular: '',
        isCliente: true, 
        modalMessage: '',
        modalVisible: false,
        senhaConfirmacao: '',
             
    };
    
    this.cadastrar = this.cadastrar.bind(this);
    this.fecharModal = this.fecharModal.bind(this);
    // Validações
    this.validadeCPF = this.validadeCPF.bind(this);
    this.validateNome = this.validateNome.bind(this);
    this.validateSexo = this.validateSexo.bind(this);
    this.validateSenha = this.validateSenha.bind(this);
    this.validadeCelular = this.validadeCelular.bind(this);
    this.validateCadastro = this.validateCadastro.bind(this);
    
    // Primeiro verifica se tem algum usuario logado, se tiver tira ele
    firebase.auth().signOut();    
  } 

  fecharModal() {
    let state = this.state;
    state.modalVisible = false;
    this.setState(state);
  }

  validateSexo(sexo) {
    const sex = 0;

    let result = false;
    if(sexo != sex) {
        result = true; 
    }

    return result ;
  }

  validadeCPF(cpf) {
    const length = 14;

    let result = false;
    if(cpf.length == length) {
        result = true;
    }

    return result;
    
  }

  validadeCelular(celular) {
    const length = 19;

    let result = false;
    if(celular.length == 19) {
        result = true;
    }

    return result
  }

  validateSenha(senha, senhaConfirmacao) {    
    
    let result = false;
    if(senha == senhaConfirmacao) {
        result = true;
    }

    return result;

  }

  validateNome(nome) {
    // Expressão regular que só aceita letras e espaços
    const pattern = /^[a-zA-Z ]+$/;
    
    let result = false;
    if(nome.match(pattern)) {
      result = true;
    }

    return result;  
  }

  validateCamposEmBranco() {
    let state = this.state;  
    let result = false;

    if(state.nome != '' && state.email != '' && state.cpf != '' && state.celular != '' && state.senha != '' && state.senhaConfirmacao != '') {
        result = true;
    }

    return result;

  }

  validateCadastro() {
    let state = this.state;
    let result = true;
    message = '';
    
    if(!this.validateNome(state.nome) && message == '') {
        result = false;
        message = 'auth/invalid-name';        
    }
    if(!this.validateSexo(state.sexo) && message == '') {
        result = false;
        message = 'auth/invalid-sex';          
    }
    if(!this.validadeCPF(state.cpf) && message == '') {
        result = false;
        message = 'auth/invalid-cpf';            
    }
    if(!this.validadeCelular(state.celular) && message == '') {
        result = false;
        message = 'auth/invalid-cell-phone';
    }
    if(!this.validateSenha(state.senha, state.senhaConfirmacao) && message == '') {
        result = false;
        message = 'auth/different-passwords';
    }

    state.modalMessage = message;
    this.setState(state);
    return result;
  }

  cadastrar() {
    let state = this.state;
    
    if(this.validateCamposEmBranco()) {
        // Listener
        firebase.auth().onAuthStateChanged((user) => {
            // Se foi cadastrado com sucesso
            if(user) {
                // Colocando/conectando esse usuario com o BD
                firebase.database().ref('usuarios').child(user.uid).set({
                    nome: state.nome,
                    sexo: state.sexos[state.sexo].value,
                    cpf: state.cpf,
                    celular: state.celular,
                    cliente: state.isCliente,                                   
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

        // Se o nome for válido
        if(this.validateCadastro()) {
            // Cadastrando no sistema de email e senha
            firebase.auth().createUserWithEmailAndPassword(state.email,state.senha)
            .catch((error) => {
                state.modalVisible = true;
                state.modalMessage = error.code;
                this.setState(state);
                // this.props.checkCadastroError(error.code)
            })
        } else {
            state.modalVisible = true;
            state.modalMessage = state.modalMessage;
            this.setState(state);
            // this.props.checkCadastroError(state.errorMessage);
        }
        
    }else {
        state.modalVisible = true;
        state.modalMessage = 'auth/required';
        this.setState(state);
        // this.props.checkCadastroError('auth/required');
    }
     
  } 

  render() { 
  
    let sexosItem = this.state.sexos.map((v, k) => {
        return <Picker.Item color='#1F2957'  key={k} label = {v.sexo} value = {k}/>
    });

    return(    
        <ImageBackground source={ background } style={ styles.background }  >    
            
            <View style={ styles.container } > 

                <View style={ styles.checkBoxArea }>
                    <Text style={{ fontSize: 20, color: '#FFF' }} >Seu perfil é de Cliente</Text>
                    <CheckBox disabled={ true } value={ this.state.isCliente } />
                </View>

                <TextInput style={ styles.input } placeholder={ this.props.nome } onChangeText={ (nome) => { this.setState({ nome })} } />               
                <TextInput style={ styles.input } placeholder={ this.props.email } onChangeText={ (email) => { this.setState({ email })} } />
                
                <Picker style = { styles.picker } selectedValue= { this.state.sexo } onValueChange = { (itemValue, itemIndex) => this.setState({ sexo: itemValue }) }>
                    { sexosItem }
                </Picker>
                
                <TextInputMask
                    style={ styles.input }
                    placeholder={ this.props.cpf }
                    keyboardType={"numeric"}
                    onChangeText={(cpf) => { this.setState({ cpf })}}
                    mask={"[000].[000].[000]-[00]"}
                />
                 <TextInputMask
                    style={ styles.input }
                    placeholder={ this.props.celular }
                    keyboardType={"numeric"}
                    onChangeText={(celular) => { this.setState({ celular })}}
                    mask={"+55 ([00]) 9[0000]-[0000]"}
                />

                <TextInput style={ styles.input } placeholder={ this.props.senha } secureTextEntry={ true } onChangeText={(senha) => { this.setState({ senha })} } />
                <TextInput style={ styles.input } placeholder={ this.props.senhaConfirmacao } secureTextEntry={ true } onChangeText={(senhaConfirmacao) => { this.setState({ senhaConfirmacao })} } />                              
                
                <View style={ styles.btnArea } >
                    <TouchableHighlight style={ styles.btnCadastrar } onPress={ this.cadastrar } underlayColor='transparent'>
                        <Text style={ styles.txtCadastrar } >CADASTRAR</Text>
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
    checkBoxArea: {
        width: 350,
        margin: 5,
        height: 50,
        padding: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',  
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
    return{
        cpf: state.auth.cpf,
        nome: state.auth.nome,
        sexo: state.auth.sexo,
        email: state.auth.email,
        senha: state.auth.senha,
        sexos: state.auth.sexos,
        celular: state.auth.celular,
        senhaConfirmacao: state.auth.senhaConfirmacao
    };
};

// Conectando a classe com o redux
const CadastroConnect = connect(mapStateToProps, { checkCadastroError })(CadastroCliente);

export default CadastroConnect;