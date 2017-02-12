import React, { Component } from 'react';
import {
  StyleSheet,
  Clipboard,
  View,
  Text,
  TextInput,
} from 'react-native';

import Back from '../common/Back';

export default class ShowClipboard extends Component {
  constructor(props) {
    super(props);
    this.state={
        content:'Clipboard content',
        refresh:true,
    };
  }

  clipBoard='';

  componentDidUpdate(){
    this._setClipboardContent();
  }

  //设置Clipboard
  _setClipboardContent = async () => {
    Clipboard.setString(this.state.content);
  };
  
  //读取Clipboard
  _getClipboardContent = async () => {
    try {
      this.clipBoard = await Clipboard.getString();
      this.setState({refresh:!this.state.refresh});
    } catch (e) {
      this.clipBoard =e.message;
      this.setState({refresh:!this.state.refresh});
    }
  };

  render() {
    return (
      <View style={styles.screen}>
        <Text onPress={this._getClipboardContent} style={{color: 'blue'}}>
          点击显示Clipboard内容
        </Text>
        <Text style={{color: 'red', marginTop: 20}}>
          {this.clipBoard}{this.state.refresh}
        </Text>
        <TextInput 
          style={{height:45,fontSize:14,color:'#333'}}
          value={this.state.content}
          onChangeText={(content)=>{this.setState({content})}}
        />
        <Back navigator={this.props.navigator} />
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  screen:{
    marginTop:30,
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
    marginBottom:20,
  },
});