import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import MainTabBar from './MainTabBar';

import Subunit from './common/Subunit';

import Lifecycle from './Lifecycle';
import ShowNavigator from './navigator/ShowNavigator';
import ShowScrollView from './some/ShowScrollView';
import NewIndex from './new/NewIndex';
import ShowAnimated from './some/ShowAnimated';
import ShowAnimated2 from './some/ShowAnimated2';
import ShowAnimated3 from './some/ShowAnimated3';
import ShowAnimated4 from './animatedApp/AnExApp';
import ShowLayoutAnimation from './some/ShowLayoutAnimation';
import ShowLayoutAnimation2 from './some/ShowLayoutAnimation2';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabNames: ['首页', '文件', '组件', '我的'],
      tabIconNames: ['ios-home', 'ios-albums', 'ios-paper-plane', 'ios-person-add'],
    };
  }

  render() {
    return (
      <ScrollableTabView
        renderTabBar={() => <MainTabBar tabNames={this.state.tabNames} tabIconNames={this.state.tabIconNames} />}
        tabBarPosition='overlayTop'
        locked={false}
        initialPage={1} >
        <View style={styles.content} tabLabel='key1' >
          <Subunit navigator={this.props.navigator} unit={Lifecycle} name='演示生命周期' />
          <TouchableOpacity onPress={() => {
              this.natieText.setNativeProps({ 
                style: { 
                  color: 'blue',
                  fontSize:18,
                }
              })
          } }>
            <Text ref={text => { this.natieText = text } }>setNativeProps</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content} tabLabel='key2' >
          <Subunit navigator={this.props.navigator} unit={ShowNavigator} name='演示Navigator' />
          <Subunit navigator={this.props.navigator} unit={ShowAnimated} name='演示Animated' />
          <Subunit navigator={this.props.navigator} unit={ShowAnimated2} name='演示Animated2' />
          <Subunit navigator={this.props.navigator} unit={ShowAnimated3} name='演示Animated3' />
          <Subunit navigator={this.props.navigator} unit={ShowAnimated4} name='演示Animated4' />
          <Subunit navigator={this.props.navigator} unit={ShowLayoutAnimation} name='演示LayoutAnimation' />
          <Subunit navigator={this.props.navigator} unit={ShowLayoutAnimation2} name='演示LayoutAnimation2' />

        </View>
        <View style={styles.content} tabLabel='key3' >
          <Subunit navigator={this.props.navigator} unit={ShowScrollView} name='演示一些组件' />
        </View>
        <View style={styles.content} tabLabel='key4' >
          <Subunit navigator={this.props.navigator} unit={NewIndex} name='演示一些组件' />
        </View>
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBEBEB',
    flex: 1
  }
});
