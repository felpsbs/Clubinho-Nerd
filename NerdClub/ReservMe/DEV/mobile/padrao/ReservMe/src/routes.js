import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';

import Login from './pages/Login';
import Home from './pages/Home';
import CadastroCliente from './pages/CadastroCliente';
import CustomDrawer from './components/CustomDrawer';

const HomeContainer = createDrawerNavigator({ 
    Home: {
        screen: Home,
    }
}, {
    contentComponent: CustomDrawer,
    drawerBackgroundColor: '#242F65',
    contentOptions: {
        activeTintColor: '#FFF',
        labelStyle: {
        fontSize: 20
    }
}
});

const MainContainer = createStackNavigator({ 
    Login: { 
        screen: Login,
        navigationOptions: {
            header: null
        } 
    },
    CadastroCliente: CadastroCliente,
    HomeContainer: {
        screen: HomeContainer,
        navigationOptions: {
            header: null
        }
    }
    
}, {
    initialRouteName: 'Login'
});

export default createAppContainer(MainContainer);