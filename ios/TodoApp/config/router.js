import LoginHolder from '../Components/loginHolder.ios.js';
import List from '../Components/list.ios.js';
import { StackNavigator } from 'react-navigation';

const AppNavigation = StackNavigator({
  Home:{
    screen: LoginHolder
  },
  List:{
    screen: List 
  }
});

export default AppNavigation;