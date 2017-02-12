import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Subunit from '../common/Subunit';
import Back from '../common/Back';

import ShowWebView from './ShowWebView';
import ShowPanResponder from './ShowPanResponder';
import ShowListView1 from './ShowListView1';
import ShowListView2 from './ShowListView2';
import ShowListView3 from './ShowListView3';
import ShowViewPagerAndroid from './ShowViewPagerAndroid';

export default class ShowScrollView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.screen}>
        <ScrollView style={{ marginBottom: 55, }}>
          <Subunit navigator={this.props.navigator} unit={ShowWebView} name='演示WebView' />
          <Subunit navigator={this.props.navigator} unit={ShowPanResponder} name='演示PanResponder' />
          <Subunit navigator={this.props.navigator} unit={ShowListView1} name='演示ListView1' />
          <Subunit navigator={this.props.navigator} unit={ShowListView2} name='演示ListView2' />
          <Subunit navigator={this.props.navigator} unit={ShowListView3} name='演示ListView3' />
          <Subunit navigator={this.props.navigator} unit={ShowViewPagerAndroid} name='演示ViewPagerAndroid' />

        </ScrollView>
        <Back navigator={this.props.navigator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBEBEB',
    flex: 1
  }
});