import React, { useState, useEffect } from 'react';
import { 
    // KeyboardAvoidingView, 
    View,
    Text,
    Modal,
    Image,
    CheckBox,
    TextInput,
    StyleSheet,    
    SafeAreaView,
    ImageBackground,
    TouchableHighlight 
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

import Erro from '../components/Erro';

import background from '../assets/images/background/background.png';
import logo from '../assets/images/logo/logo_branca_transparente.png';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [clientBox, setClientBox] = useState(false);
    const [profBox, setProfBox] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user) {
                navigation.navigate('HomeContainer');
            }
        })
    }, []);

    useEffect(() => {
        if(clientBox) {
            setProfBox(false);
        }
    }, [clientBox]);

    useEffect(() => {
        if(profBox) {
            setClientBox(false);
        }
    }, [profBox]);

    async function handleLogin() {

        const response = await api.post('client/login', {
            email: email,
            password: password,
            perfil: clientBox ? 'client' : profBox ? 'profissional' : ''
        });
      
        const { code } = response.data;
        if(code == 400) {
            const { message } = response.data;
            setModalVisible(true);
            setModalMessage(message);   
        }

        if(code == 200) {
            const { user, name } = response.data;
            await AsyncStorage.multiSet([
                ['user', user], 
                ['username', name]
            ]);
            navigation.navigate('HomeContainer');
        }            
            
    }

    async function handleSignUp() {
        navigation.navigate('CadastroCliente');
    }

    function handleModalVisible() {
        setModalVisible(false);
        setModalMessage(''); 
    }

    return(
        <ImageBackground source={ background } style={ styles.background }  >                  
       
            <View style={ styles.logoArea } >
                <Text style={ styles.appTitle } >ReservMe</Text>
                <Image source={ logo } style={ styles.logo } />
            </View>

            <SafeAreaView style={ styles.container } >   
  
                <View style={ styles.inputArea } >
                    <TextInput style={ styles.input } placeholder='email@email.com' onChangeText={ setEmail } />
                    <TextInput style={ styles.input } placeholder='******' secureTextEntry={ true } onChangeText={ setPassword } />
                </View>

                <View style={{ alignItems:'center', justifyContent:'center', flexDirection: 'row' }} >
                    
                    <Text style={ styles.checkBoxText } >Quem é você?</Text>
                    
                    <View style={ styles.perfilArea } >
                    
                        <View style={styles.checkBoxArea} >              
                            <CheckBox  value={ clientBox } disabled={ clientBox } onValueChange={() => { setClientBox(!clientBox) }} />                 
                            <Text style={ styles.checkBoxText } >Cliente</Text>
                        </View>

                        <View style={styles.checkBoxArea} >
                            <CheckBox  value={ profBox } disabled={ profBox } onValueChange={ () => { setProfBox(!profBox) } } />
                            <Text style={ styles.checkBoxText } >Profissional</Text>
                        </View>
            
                    </View>
                </View>
          
                <View style={ styles.btnArea } >
                    <TouchableHighlight style={ styles.btnEntrar } onPress={ handleLogin } underlayColor='transparent' >
                        <Text style={ styles.txtEntrar } >ENTRAR</Text>
                    </TouchableHighlight>  
                
                    <TouchableHighlight style={ styles.btnCadastrarAre} onPress={ handleSignUp } underlayColor='transparent' >
                        <Text style={ styles.txtCadastrar } >Ainda não possui uma conta?</Text>
                    </TouchableHighlight>
                </View>   
                { modalVisible && (
                    <Modal animationType='slide' visible={ true } transparent={ true } >
                        <View style={ styles.modalArea } >
                            <Erro fechar={ handleModalVisible } message={ modalMessage } />
                        </View>            
                    </Modal>
                ) }    
                  
            </SafeAreaView>
        </ImageBackground>
    ); 
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

export default Login;