import React, { Component } from 'react';
import { 
    View, 
    Image,
    StyleSheet, 
    ImageBackground,
    TouchableHighlight
} from 'react-native'; 

export default class Home extends Component {

    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
            <Image source={ require('../assets/images/icons/home_ativo.png') } style={ [styles.menuIcon, { tintColor:tintColor }] } />
        ),
    };

    render() {

        return(
            <ImageBackground source={ require('../assets/images/background/bluebackground.png') } style={ styles.background }  >
            
                <View style={ styles.container } > 

                    <TouchableHighlight onPress={ () => this.props.navigation.toggleDrawer() } style={ styles.btnMenu } underlayColor='transparent'>
                        <ImageBackground source={require('../assets/images/icons/menu.png')} resizeMode='cover' style={ styles.menuIcon } />
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