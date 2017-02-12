import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class Back extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <TouchableOpacity onPress={() => {this.props.navigator.pop()}} style={styles.backButton}>
        <Text style={styles.backText}>返回</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  backButton:{
    // position:'absolute',
    // left:0,
    // right:0,
    // bottom:0,
    height:45,
    backgroundColor:'#E64346',
    flexDirection:'row',
    alignItems:'center',
    borderRadius:5,
  },
  backText:{
    flex:1,
    fontSize:14,
    color:'#fff',
    textAlign:'center',
  },
});