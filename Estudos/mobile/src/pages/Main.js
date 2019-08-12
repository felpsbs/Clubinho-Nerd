import React, { useState, useEffect }  from  'react';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import { View, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import itsamatch from '../assets/itsamatch.png';

export default function Main({ navigation }) {
    // pegando a informação que foi passada como parametro
    const id = navigation.getParam('user');

    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(true);

    // recebe a função que será executada e quando ele deve ser executada
    useEffect(() => {
        async function loadUsers() {
            const response =  await api.get('/devs', {
                headers:  { 
                    user: id
                } 
            });

            setUsers(response.data);
        }

        loadUsers();
    }, [id]);

    // cudia das requisições ao socket
    useEffect(() => {
        // conectando com o backend via socket
        // passando o id do usuário
        // são tipo listeners
        const socket = io('http://localhost:3333', {
            query: { 
                user: id 
            }
        });
       
        // ouvindo o evento match
        socket.on('match', dev => {
            setMatchDev(dev);
        });
    }, [id]);

    async function handleLike() {
        // [primeira posicao do array, ...o resto]
        const [user, ...rest] = users;

        await api.post(`/devs/${ user._id }/dislikes`, null, {
            headers: {
                user: id
            }
        });
        // fazendo com que apôs o dislike, a pagina atualize
        setUsers(rest);
    }
    
    async function handleDisLike() {
        // [primeira posicao do array, ...o resto]
        const [user, ...rest] = users;
        await api.post(`/devs/${ user._id }/dislikes`, null, {
            headers: {
                user: id
            }
        });
        // fazendo com que apôs o dislike, a pagina atualize
        setUsers(rest);
            
    }

    async function handleLogout() {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    return(
        <SafeAreaView style={ styles.container } >
            <TouchableOpacity onPress={ handleLogout }>
                <Image style={ styles.logo } source={ logo }/>
            </TouchableOpacity>    
            <View style={ styles.cardsContainer } >
                { users.length > 0 ? (
                    users.map((user, index) => (
                        <View  key={ user._id } style={ [styles.card, { zIndex: users.length - index }] }  >
                            <Image style={styles.avatar} source={{ uri: user.avatar}} />
                            <View style={ styles.footer } >
                                <Text style={ styles.name } >{ user.name }</Text>
                                <Text style={ styles.bio }  numberOfLines={3}>{ user.bio }</Text>
                            </View>
                        </View>
                    ))
                ) : <Text style={ styles.empty } >Acabou!</Text> }
            </View>
            {  users.length >  0 && (
                <View style={ styles.buttonsContainer } >
                    <TouchableOpacity style={ styles.button } onPress={ handleLike }>
                        <Image source={ like } />
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.button } onPress={ handleDisLike }>
                        <Image source={ dislike } />
                    </TouchableOpacity>
                </View>
            ) }

            { matchDev && (
                <View style={ styles.matchContainer } >
                    <Image style={ styles.matchImage } source={ itsamatch } />
                    <Image style={ styles.matchAvatar } source={{ uri: matchDev.avatar }} />
                    <Text style={ styles.matchName } >{ matchDev.name }</Text>
                    <Text style={ styles.matchBio } >{ matchDev.bio }</Text>
                    <TouchableOpacity style={ styles.closeMatch } onPress={ () => setMatchDev(null) }>
                        <Text style={ styles.closeMatch } >FECHAR</Text>
                    </TouchableOpacity>
                </View>
            ) }
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        // para ficar um card por cima do otro
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    avatar: {
        flex: 1,
        height: 300
    },
    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,

    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18

    },
    logo: {
        marginTop: 30 
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30,  
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        // sombrano android
        elevation: 2,
        // sombra no ios tem que especificar tudo: shadowcolor..
    },
    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold'
    },
    matchContainer: {
        // para pegar a tela inteira
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    matchImage: {
        height: 60,
        // pra imagem se adaptar ao 'container' dela
        resizeMode: 'contain'
    },
    matchAvatar: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 5,
        borderColor: '#fff',    
        marginVertical: 30,
    },  
    matchName: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff'
    },
    matchBio: {
        marginTop: 10,
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 24,
        textAlign: 'center',
        paddingHorizontal: 30,           
    },
    closeMatch: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        marginTop: 30,
        fontWeight: 'bold',
    }
});