import { 
  createAppContainer,
  createStackNavigator 
} from 'react-navigation';

import Home from './src/components/Home';
import Login from './src/components/Login';
import Cadastro from './src/components/Cadastro';

const Navigator = createStackNavigator({
  // Aqui vão as telas que poderão ser navegadas
  Home: {   
    screen: Home
  },
  Login: {
    screen: Login
  },
  Cadastro: {
    screen: Cadastro
  }  

}, {
  // Pagina inicial
  initialRouteName: 'Login',
  
});

const AppContainer = createAppContainer(Navigator);

export default AppContainer;