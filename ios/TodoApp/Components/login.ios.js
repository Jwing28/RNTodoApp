import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import { Input } from './input.ios.js';
import * as firebase from 'firebase';
import firebaseConfig from '../Firebase/firebaseConfig.js';

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class LoginForm extends Component {
  constructor() {
    super();

    this.state = { email: '', password: '', loginStatus: '', error: 'ok', loading: false };
    this.onLoginPress = this.onLoginPress.bind(this);
  }

  onLoginPress() {
    const { email, password } = this.state;

    if(email === '' || password === '') {
      this.setState({ loginStatus: 'Please provie an email and password', loading: false });
    } else {
      this.setState({ loginStatus: '', loading: true });    
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({ loginStatus: 'Authentication Successful', loading: false, email:'', password:'' });
            this.props.navigation.navigate('List');
        })
        .catch((error) => {
          //Login was not successful, create a new account
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ loginStatus: '', loading: false });
                this.props.navigation.navigate('List');
            })
            .catch(() => {
                this.setState({ loginStatus: 'Authentication failed.', loading: false });
            });
        });      
    }
  }
  renderButtonOrLoader() {
    if (this.state.loading) {
        return <Text>Logging in..please wait</Text>;
    }
    return (
      <Button onPress={() => {           
        this.onLoginPress();
      }} 
      title="Log in" />
    );
  }
  render() {
    return (
      <View>
        <Input
          label='Email Address'
          placeholder='your@email.com'
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <Input
          label='Password'
          autoCorrect={false}
          placeholder='*******'
          secureTextEntry
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <Text>{this.state.loginStatus}</Text>
        {this.renderButtonOrLoader()}          
      </View>
    );
  }
}

export default LoginForm;
