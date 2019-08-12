import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform,Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

import logo from '../assets/logo.png';


export default function Login({ navigation }) {

    const [user, setUser] = useState('');

    // para disparar uma função em um determinado momento/acontecimento
    // quando algum elemento for exibido em tela
    // [] = vazio que dizer que vai executar apenas 1 vez
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user) {
                navigation.navigate('Main', { user });
            }
        })
    }, []);

    async function handleLogin() {

        const response = await api.post('/devs', { 
            username: user
        })

        const { _id } = response.data;

        // nome e o valor, Salvando na storage
        await AsyncStorage.setItem('user', _id); 

        console.log(_id);
        // passando o id como parametro para a próxima pagina
        navigation.navigate('Main', { user: _id });
    }

    return(
        <KeyboardAvoidingView 
            style={ styles.container }
            behavior='padding'
            enabled = { Platform.OS == 'ios' }
        >
            <Image source={ logo } />
            <TextInput 
                style={ styles.input } 
                autoCapitalize= "none"
                autoCorrect={ false }
                placeholder='Digite seu usuário do Github'
                placeholderTextColor= '#999'
                value={ user }
                onChangeText={ setUser }
            />
            <TouchableOpacity style={ styles.button }  onPress={ handleLogin } > 
                <Text style={ styles.buttonText } >Enviar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    ); 
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor:'#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15
    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight:'bold',
        fontSize: 16
    },
});

