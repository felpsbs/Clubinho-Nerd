import React, { Component } from 'react';
import { 
    Text,
    View, 
    Button, 
    StyleSheet, 
    ImageBackground
} from 'react-native'; 
import firebase from './FirebaseConnection';
import { NavigationActions, StackActions } from 'react-navigation';

export default class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    };
    
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
        alert('Deslogado com sucesso!');
      }

    render() {

        return(
            <ImageBackground source={ require('../../assets/images/background/bluebackground.png') } style={ styles.background }  >
            
                <View style={ styles.container } > 

                    <Text style = { styles.title }>Bem-vindo!</Text>                   
                    <Button title='Sair' onPress={ this.logout } />

                </View>

            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20        
    },   
    title: {
        color: '#000000',
        fontSize: 25,
        textAlign: 'center'
    },
    background:{
        flex: 1,
        width: null
    }  
});