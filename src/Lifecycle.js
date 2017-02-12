import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import Back from './common/Back';

class Step extends Component{
  constructor(props) {
    super(props);
  }



  // componentWillMount() {
  //   console.info('1.inner==>componentWillMount',this.props);
  // }

  // componentDidMount() {
  //   console.info('2.inner==>componentDidMount',this.props);
  // }

  // shouldComponentUpdate(){
  //   console.info('3.inner==>shouldComponentUpdate',this.props);
  //   return true;
  // }

  // componentWillUpdate() {
  //   console.info('4.inner==>componentWillUpdate',this.props);
  // }

  // componentWillReceiveProps() {
  //   console.info('5.inner==>componentWillReceiveProps',this.props);
  // }

  // componentDidUpdate(){
  //   console.info('6.inner==>componentDidUpdate',this.props);
  // }

  // componentWillUnmount(){
  //   console.info('7.inner==>componentWillUnmount');
  // }



  render() {
    // console.log('Step',this.props);
    // console.info('React',React);
    return (
      <View>
        <Text>接收新的参数 {this.props.step}</Text>
        {this.props.children}
      </View>
    );
  }
}

export default class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { 
      step: '',
      switch:true
    };
  }

  // componentWillMount() {
  //   console.info('1.componentWillMount',this.state);
  // }

  // componentDidMount() {
  //   console.info('2.componentDidMount',this.state);
  // }

  // shouldComponentUpdate(){
  //   console.info('3.shouldComponentUpdate',this.props);
  //   console.log('this.ref',this.refs);
  //   return true;
  // }

  // componentWillUpdate() {
  //   console.info('4.componentWillUpdate',this.state);
  // }

  // //在外面没有新的props,不执行
  // componentWillReceiveProps() {
  //   console.info('5.outer====>componentWillReceiveProps');
  // }

  // componentDidUpdate(){
  //   console.info('6.componentDidUpdate',this.state);
  // }

  // componentWillUnmount(){
  //   console.info('7.componentWillUnmount');
  // }

  onPress = () => {
    this.setState({
      step:this.state.switch?'receiveProps':'',
      switch:!this.state.switch,
    });
    console.log('step',this.refs);
  };

  render() {
    return (
      <View style={styles.screen}>
        <TouchableOpacity onPress={this.onPress} style={styles.content}>
          <Step ref='step' step={this.state.step}>
            <Text>这里用来测试children</Text>
          </Step>
        </TouchableOpacity>
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
	}
});