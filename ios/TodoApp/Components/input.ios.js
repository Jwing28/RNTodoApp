import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label.toUpperCase()}</Text>
            <TextInput
                autoCorrect={false}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
                style={inputStyle}
            />
        </View>
    );
};

const styles = {
  inputStyle: {
    padding:5,
    fontSize:15
  },
  labelStyle: {
    fontSize:15
  },
  containerStyle: {
    height:45,
    borderColor:'#6495ed',
    borderBottomWidth: 2
  }
}

export { Input };
