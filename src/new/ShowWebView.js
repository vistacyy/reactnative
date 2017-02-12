import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  WebView,
} from 'react-native';

import Back from '../common/Back';

export default class ShowScrollView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.screen}>
        <WebView 
          source={{uri:'https://www.baidu.com/'}}
        />
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