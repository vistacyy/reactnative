import React, { Component } from 'react';
import {
  AsyncStorage,
  Picker,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import Back from '../common/Back';

let STORAGE_KEY = '@AsyncStorageExample:key';
let COLORS = ['red', 'orange', 'yellow', 'green', 'blue'];


export default class ShowPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: COLORS[0],
      messages: [],
    };
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    try {
      var value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null){
        this.setState({selectedValue: value});
        this._appendMessage('Recovered selection from disk: ' + value);
      } else {
        this._appendMessage('Initialized with no selection on disk.');
      }
    } catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message);
    }
  };

  _onValueChange = async (selectedValue) => {
    this.setState({selectedValue});
    try {
      await AsyncStorage.setItem(STORAGE_KEY, selectedValue);
      this._appendMessage('Saved selection to disk: ' + selectedValue);
    } catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message);
    }
  };

  _removeStorage = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      this._appendMessage('Selection removed from disk.');
    } catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message);
    }
  };

  _appendMessage = (message) => {
    this.setState({messages: this.state.messages.concat(message)});
  };

  render() {
    let color = this.state.selectedValue;
    return (
      <View style={styles.screen}>
        <Picker
          selectedValue={color}
          onValueChange={this._onValueChange}>
          {COLORS.map((value) => (
            <Picker.Item
              key={value}
              value={value}
              label={value}
            />
          ))}
        </Picker>
        <Text>
          'Selected: '
          <Text style={{color}}>
            {this.state.selectedValue}
          </Text>
        </Text>
        <Text>{' '}</Text>
        <Text onPress={this._removeStorage}>
          Press here to remove from storage.
        </Text>
        <Text>{' '}</Text>
        <Text>Messages:</Text>
        {this.state.messages.map((m) => <Text key={m}>{m}</Text>)}
        <Back navigator={this.props.navigator} />
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  screen:{
    flex:1,
  },
	content: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#EBEBEB',
		flex: 1
	},
  text:{
    marginHorizontal:10,
    fontSize:14,
    color:'#333',
  },
});