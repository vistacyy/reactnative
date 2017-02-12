import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Subunit from '../common/Subunit';
import Back from '../common/Back';
import ShowCameraRoll from './ShowCameraRoll';
import ShowDrawerLayoutAndroid from './ShowDrawerLayoutAndroid';
import ShowModelAndPicker from './ShowModelAndPicker';
import ShowRefreshControl from './ShowRefreshControl';
import ShowSlider from './ShowSlider';
import ShowStatusBar from './ShowStatusBar';
import ShowAlert from './ShowAlert';
import ShowAppState from './ShowAppState';
import ShowAsyncStorage from './ShowAsyncStorage';
import ShowClipboard from './ShowClipboard';


export default class ShowScrollView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // 连续父元素设置flex:1时，ScrollView自动为flex:1，height和padding无效
    // 无自动的flex:1时高度为内容高度加上margin,padding
    // 但设置了height后padding无效
    return (
      <View style={styles.screen}>
        <ScrollView>
          <Subunit navigator={this.props.navigator} unit={ShowCameraRoll} name='演示CameraRoll' />
          <Subunit navigator={this.props.navigator} unit={ShowDrawerLayoutAndroid} name='演示DrawerLayoutAndroid' />
          <Subunit navigator={this.props.navigator} unit={ShowModelAndPicker} name='演示Model和Picker' />
          <Subunit navigator={this.props.navigator} unit={ShowRefreshControl} name='演示RefreshControl' />
          <Subunit navigator={this.props.navigator} unit={ShowSlider} name='演示Slider' />
          <Subunit navigator={this.props.navigator} unit={ShowStatusBar} name='演示StatusBar' />
          <Subunit navigator={this.props.navigator} unit={ShowAlert} name='演示Alert' />
          <Subunit navigator={this.props.navigator} unit={ShowAppState} name='演示AppState' />
          <Subunit navigator={this.props.navigator} unit={ShowAsyncStorage} name='演示AsyncStorage' />
          <Subunit navigator={this.props.navigator} unit={ShowClipboard} name='演示Clipboard' />
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