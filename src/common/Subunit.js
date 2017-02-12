import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class Subunit extends Component {
  constructor(props) {
    super(props);
  }

  //演示组件unit
  showSubunit(unit){
    this.props.navigator.push({
      name:unit.name,
      component:unit,
    });
  };

  render() {
    return (
      <TouchableOpacity onPress={this.showSubunit.bind(this,this.props.unit)} style={styles.button}>
        <Text style={styles.text}>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    marginTop:10,
    height:45,
    backgroundColor:'#E64346',
    flexDirection:'row',
    alignItems:'center',
    borderRadius:5,
  },
  text:{
    flex:1,
    fontSize:14,
    color:'#fff',
    textAlign:'center',
  },
});