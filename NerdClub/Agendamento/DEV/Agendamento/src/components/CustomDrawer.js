import React, { Component } from 'react';
import { 
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import { StackActions, NavigationActions, DrawerItems } from 'react-navigation';
import firebase from './FirebaseConnection';

export default class CustomDrawer extends Component {

  constructor(props) {
      super(props);
      
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
                <Image source={ require('../../assets/images/icons/perfil.png') } style={ styles.perfilImg } />
                <Text style={ styles.username } >NOME DO USUÁRIO</Text>
            </View>
            <ScrollView style={{ marginTop: 10 }} >
                <DrawerItems { ...this.props } />
            </ScrollView>
            <View style={ styles.btnArea } >
                <TouchableHighlight style={ styles.botao } onPress={ this.logout } underlayColor='transparent' >
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
        fontSize: 15,
        margin: 5 
    },
    btnArea: {        
        
    },
    botao: {
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
        flexDirection: 'row', 
        justifyContent: 'flex-start' 
    }
    
});  