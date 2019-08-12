import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Login from './pages/Login';
import CadastroCliente from './pages/CadastroCliente';
import Reducers from './redux/store/Reducers';
import HomeContainer from './components/HomeContainer';

// Armazana todos os Reducers
let store = createStore(Reducers);

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
  CadastroCliente: {
    screen: CadastroCliente,
  }  

}, {
  // Pagina inicial
  initialRouteName: 'Login',
  // Para o título ficar no centro do header
  headerLayoutPreset: 'center'

});

const AppContainer = createAppContainer(Navigator);

export default class App extends Component {
    render() {
      
      return(
        
        <Provider store={ store } >
          <AppContainer />
        </Provider>

      );
    }
}