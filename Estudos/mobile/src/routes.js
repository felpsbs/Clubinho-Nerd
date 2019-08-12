import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Main from './pages/Main';

export default createAppContainer(
    // Aqui dentro, vão os diferentes tipos de navegação: stack, bottomtab,switch...
    createSwitchNavigator({
        Login,
        Main,
    })
);