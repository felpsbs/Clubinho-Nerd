import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet, 
    TouchableHighlight,
} from 'react-native'; 

export default class Error extends Component {
 
    constructor(props) {
        super(props);
        
        this.state = {
            message: this.props.message
        };

    }

    render() {
        return(
            <View style={ styles.container } >
                <Text style={{ fontSize: 30, color: '#FFF', textAlign: 'center', marginTop: 5 }} >Ops!</Text>
                <Text style={ styles.erroMessage } >{ this.state.message }</Text>  
                <TouchableHighlight style={ styles.botao } onPress={ this.props.fechar } underlayColor='transparent' >
                    <Text style={ styles.txtFechar } >FECHAR</Text>
                </TouchableHighlight>
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 300,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: '#292929',        
    },   
    erroMessage: {
        color: '#FFFFFF',
        fontSize: 23,
        marginTop: 50,
        textAlign: 'center'       
    },
    botao: {
        marginTop: 100,
        width: '50%',
        height: 40,      
        alignItems: 'center',
        borderRadius: 5,        
        justifyContent: 'center',
        backgroundColor: '#24C2CB',
    },
    txtFechar: {
        color: '#FFFFFF',
        fontSize: 15
    },
});    