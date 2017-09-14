import React, { Component } from 'react';
import { View, Button, Text, TextInput, FlatList, Picker } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Input } from './input.ios.js';
import * as firebase from 'firebase';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = { list:[{key:0, text:'Sample Task'}], task:'Your Task', newTask:'Change Task Here', newIndex: 0, value:'' };    
  }

  removeTask(itemIndex) { 
    const newList = this.state.list.slice().filter(function(task,index){ 
      return index != itemIndex;
    });

    this.setState({ list:  newList });
  }

  addTask() {
    const newTask = { key: this.state.list.length || 1, text: this.state.task }; 
    const updatedList = [...this.state.list, newTask];
    this.setState({list: updatedList});
  }

  editTask() {
    console.log('newTask: ' + this.state.newTask + " newIndex " + this.state.newIndex);
    const editedTask = this.state.list.map(function (task,index) {
      if(index == this.state.newIndex) {
        
        return { key:index, text: this.state.newTask }
      }
      return task;
    },this);
    console.log('editedtask',editedTask)
    this.setState({ list: editedTask });
  }

  logout() {
    //log user out of firebase auth
    firebase.auth().signOut().then(()=>{
      console.log('User logged out');
    },
    (error) => {
      console.log('An issue with logout has occurred', error);
    })

    //back to login screen
    this.props.navigation.goBack(null)
  }

  render() {
    const listData = this.state.list.map((task,index) => {
      return (
        <View style={{flexDirection:'row', justifyContent:'space-between'}} key={task.key}>
          <Text style={{fontSize:20, textDecorationLine:'underline'}}>
            {task.text}                      
          </Text> 
          <Button onPress={() => this.removeTask(index)} title="X" />
        </View>
      )
    });    

    return (
      <View>
        <Text>What to-do? Get it?</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(task) => this.setState({task})}
          value={this.state.task}
        />
        {listData}
        <Button onPress={() => this.addTask()} title="Add Task" />
        <Button style={{height:10}} onPress={() => this.logout()} title="Logout" />
        <View>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(newTask) => this.setState({newTask})}
            value={this.state.newTask}
          />   
          <ModalDropdown
            onSelect={(idx) => { this.setState({ newIndex: idx }) }}
            defaultValue={'Select Task'}
            options={this.state.list.slice().map((task,index) => {
              return task.text;
            })}
          />     
          <Button onPress={() => this.editTask()} title="Update Task" />    
        </View>
      </View>      
    );
  }
}

export default List;
