import React, { Component } from 'react';
import { 
    View, 
    Image,
    StyleSheet, 
    ImageBackground,
    TouchableHighlight
} from 'react-native'; 

// Images
import background from '../assets/images/background/background.png';
import homeAtivo from '../assets/images/icons/home_ativo.png';
import menuIcon from '../assets/images/icons/menu.png';

export default class Home extends Component {

    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
            <Image source={ homeAtivo } style={ [styles.menuIcon, { tintColor:tintColor }] } />
        ),
    };

    render() {

        return(
            <ImageBackground source={ background } style={ styles.background }  >
            
                <View style={ styles.container } > 

                    <TouchableHighlight onPress={ () => this.props.navigation.toggleDrawer() } style={ styles.btnMenu } underlayColor='transparent'>
                        <ImageBackground source={ menuIcon } resizeMode='cover' style={ styles.menuIcon } />
                    </TouchableHighlight>                                 

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
    },
    menuIcon: {
        width: 40,
        height: 40 
    },
    btnMenu: {
        width: 35,
        height: 35
    }
});