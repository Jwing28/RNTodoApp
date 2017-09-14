import React, { Component } from 'react';
import AppNavigation  from './ios/TodoApp/config/router.js';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';



export default class TodoApp extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <AppNavigation />
    );
  }
}

AppRegistry.registerComponent('TodoApp', () => TodoApp);
