import { 
    createAppContainer,
    createDrawerNavigator 
} from 'react-navigation';
  
import Home from './Home';
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
  drawerBackgroundColor: '#373737',
  contentOptions: {
      activeTintColor: '#24C2CB',
      labelStyle: {
        fontSize: 20
      }
  }
});

const HomeContainer = createAppContainer(Navigator);

export default HomeContainer;