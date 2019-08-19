import React, { useState }  from  'react';
import { 
    View,
    Text,
    Modal,
    Image,
    Picker,
    CheckBox,
    TextInput,
    ScrollView,
    StyleSheet,
    ImageBackground,
    TouchableHighlight,
} from 'react-native';
import TextInputMask from 'react-native-text-input-mask'; 
import AsyncStorage from '@react-native-community/async-storage';  
import api from '../services/api';
import Erro from '../components/Erro';

// Images
import background from '../assets/images/background/background.png';
import leftArrow from '../assets/images/icons/left-arrow.png';
import logo from '../assets/images/logo/logo_branca_transparente.png';

const CadastroCliente = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sex, setSex] = useState('Masculino');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [sexes, setSexes] = useState([
        'Masculino',
        'Feminino'
    ]);

    async function handleSignUp() {
        const response = await api.post('client', {
            name: name,
            sex: sex,
            email: email,
            cpf: cpf,
            phone: phone,
            password: password,
            passwordConfirmed: confirmedPassword,
            perfil: 'client'
        });
      
        const { code } = response.data;
        if(code == 400) {
            const { message } = response.data;
            setModalVisible(true);
            setModalMessage(message);   
        }

        if(code == 200) {
            const resp =  await api.get('/client', {
                headers:  { 
                    email: email
                } 
            });

            const { code } = resp.data;
            if(code == 400) {
                const { message } = resp.data;
                setModalVisible(true);
                setModalMessage(message);   
            }
            
            if(code == 200) {
                const { user, name } = resp.data;
                await AsyncStorage.multiSet([
                    ['user', user], 
                    ['username', name]
                ]);
                navigation.navigate('HomeContainer');
            }   
        } 
    }

    function handleModalVisible() {
        setModalVisible(false);
        setModalMessage(''); 
    }

    return(
        
        <ImageBackground source={ background } style={ styles.background }  >    
            
            <View style={ styles.container } > 

                <View style={ styles.checkBoxArea }>
                    <Text style={{ fontSize: 20, color: '#FFF' }} >Seu perfil é de Cliente</Text>
                    <CheckBox disabled={ true } value={ true} />
                </View>
                <ScrollView>
                    <TextInput style={ styles.input } placeholder='Nome Completo' onChangeText={ setName } />               
                    <TextInput style={ styles.input } placeholder='exemplo@exemplo.com' onChangeText={ setEmail } />
                    
                    <Picker style = { styles.picker } selectedValue= { sex } onValueChange = { (itemValue, itemIndex) => { setSex(itemValue) } }>
                        { sexes.map(sex => {
                            return <Picker.Item color='#1F2957'  key={sex} label = {sex} value = {sex}/>
                        }) }
                    </Picker>
                    
                    <TextInputMask
                        style={ styles.input }
                        placeholder='000.000.000-00'
                        keyboardType={"numeric"}
                        onChangeText={ setCpf }
                        mask={"[000].[000].[000]-[00]"}
                    />
                    <TextInputMask
                        style={ styles.input }
                        placeholder='+55 (00) 90000-0000'
                        keyboardType={"numeric"}
                        onChangeText={ setPhone }
                        mask={"+55 ([00]) 9[0000]-[0000]"}
                    />

                    <TextInput style={ styles.input } placeholder='Senha' secureTextEntry={ true } onChangeText={ setPassword } />
                    <TextInput style={ styles.input } placeholder='Confirmação de senha' secureTextEntry={ true } onChangeText={ setConfirmedPassword } />                              
                </ScrollView>    

                <View style={ styles.btnArea } >
                    <TouchableHighlight style={ styles.btnCadastrar } onPress={ handleSignUp } underlayColor='transparent'>
                        <Text style={ styles.txtCadastrar } >CADASTRAR</Text>
                    </TouchableHighlight>  
                </View>
                  
                { modalVisible && (
                    <Modal animationType='slide' visible={ true } transparent={ true } >
                        <View style={ styles.modalArea } >
                            <Erro fechar={ handleModalVisible } message={ modalMessage } />
                        </View>            
                    </Modal>
                ) }      
                
            </View>

        </ImageBackground>
    ); 
}

CadastroCliente.navigationOptions = {
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

export default CadastroCliente;