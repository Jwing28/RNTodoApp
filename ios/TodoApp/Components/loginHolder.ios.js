import React from 'react';
import LoginForm from './login.ios.js';

const LoginHolder = ({ navigation }) => {
  return <LoginForm navigation={navigation} />
};

LoginHolder.navigationOptions = {
  title: 'My Todo App'
};

export default LoginHolder;