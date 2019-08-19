import React, { useState, useEffect } from 'react';
import { 
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { DrawerItems } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import perfilIcon from '../assets/images/icons/perfil.png';

const CustomDrawer = props => { 

    const [username, setUsername] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('username').then(username => {
            if(username) {
                setUsername(username);
            }
        })
    }, []);

    async function logout() {
        await AsyncStorage.clear();
        props.navigation.navigate('Login');
    }

    return(    
        <View style={ styles.container } >
            <View style={ styles.perfilArea }>
            <Image source={ perfilIcon } style={ styles.perfilImg } />
                <Text style={ styles.username } >{ username }</Text>
            </View>
            <ScrollView style={{ margin: 5 }} >
                <DrawerItems {...props} />
            </ScrollView>
            <View style={ styles.btnArea } >
                <TouchableHighlight style={ styles.btnSair } onPress={ logout } underlayColor='transparent' >
                    <Text style={ styles.txtSair } >SAIR</Text>
                </TouchableHighlight>  
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    perfilImg: {
        width: 65,
        height: 65,
        margin: 5
    },
    username: {
        color: '#FFFFFF',
        fontSize: 20,
        margin: 5 
    },
    btnArea: {        
        
    },
    btnSair: {
        width: '100%',
        height: 40,         
        alignItems: 'center',
        borderRadius: 5,        
        justifyContent: 'center',
        backgroundColor: '#24C2CB',
    },
    txtSair: {
        color: '#FFFFFF',
        fontSize: 15
    },
    perfilArea: {
        alignItems: 'center', 
        justifyContent: 'center' 
    }
    
});  

export default CustomDrawer;