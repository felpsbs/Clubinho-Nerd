import React, { Component } from 'react';
import { 
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { StackActions, NavigationActions, DrawerItems } from 'react-navigation';
import firebase from './FirebaseConnection';

export default class CustomDrawer extends Component {

  constructor(props) {
    super(props);

    this.state = {
        username: ''
    };

    // Pegando as informações do usuário logado
    let userUID = firebase.auth().currentUser.uid;
    firebase.database().ref('usuarios').child(userUID).on('value', (snapshot) => {
        let state = this.state;
        state.username = snapshot.val().nome;
    });
    
    this.logout = this.logout.bind(this);

  }

  logout() {
    firebase.auth().signOut();
    this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Login' })
        ]
    }));
  }
    
  render() { 

    return(    
        <View style={ styles.container } >
            <View style={ styles.perfilArea }>
                <Image source={ require('../assets/images/icons/perfil.png') } style={ styles.perfilImg } />
                <Text style={ styles.username } >{ this.state.username }</Text>
            </View>
            <ScrollView style={{ margin: 5 }} >
                <DrawerItems { ...this.props } />
            </ScrollView>
            <View style={ styles.btnArea } >
                <TouchableHighlight style={ styles.btnSair } onPress={ this.logout } underlayColor='transparent' >
                    <Text style={ styles.txtSair } >SAIR</Text>
                </TouchableHighlight>  
            </View>
        </View>
    );
  }

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