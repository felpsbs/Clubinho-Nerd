import { 
  createAppContainer,
  createStackNavigator 
} from 'react-navigation';

import HomeContainer from './src/components/HomeContainer';
import Login from './src/components/Login';
import Cadastro from './src/components/Cadastro';

const Navigator = createStackNavigator({
  // Aqui vão as telas que poderão ser navegadas
  HomeContainer: {
    screen: HomeContainer,
    navigationOptions: {
      header: null
    }
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
  // Para o título ficar no centro do header
  headerLayoutPreset: 'center'

});

const AppContainer = createAppContainer(Navigator);

export default AppContainer;