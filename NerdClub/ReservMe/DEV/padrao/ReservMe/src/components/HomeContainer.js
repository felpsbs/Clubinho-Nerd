import { 
    createAppContainer,
    createDrawerNavigator 
} from 'react-navigation';
  
import Home from '../pages/Home';
import CustomDrawer from './CustomDrawer';

const Navigator = createDrawerNavigator({
  // Aqui vão as telas que poderão ser navegadas
  Home: {   
    screen: Home
  },

}, {
  contentComponent: CustomDrawer,
  // Pagina inicial
  initialRouteName: 'Home',
  drawerBackgroundColor: '#242F65',
  contentOptions: {
      activeTintColor: '#FFF',
      labelStyle: {
        fontSize: 20
      }
  }
});

const HomeContainer = createAppContainer(Navigator);

export default HomeContainer;