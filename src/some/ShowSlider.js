import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Slider,
  TouchableOpacity,
} from 'react-native';

import Back from '../common/Back';


class SliderExample extends Component {
  constructor(props) {
    super(props);
    this.state={
      value: this.props.value,
    };
  }
  static defaultProps = {
    value: 0,
  };

  render() {
    return (
      <View>
        <Text style={styles.text} >
          {this.state.value && +this.state.value.toFixed(3)}
        </Text>
        <Slider
          {...this.props}
          onValueChange={(value) => this.setState({value: value})} />
      </View>
    );
  }
}

class SlidingCompleteExample extends Component {
  constructor(props) {
    super(props);
    this.state={
      slideCompletionValue: 0,
      slideCompletionCount: 0,
    };
  }

  render() {
    return (
      <View>
        <SliderExample
          {...this.props}
          onSlidingComplete={(value) => this.setState({
              slideCompletionValue: value,
              slideCompletionCount: this.state.slideCompletionCount + 1})} />
        <Text>
          Completions: {this.state.slideCompletionCount} Value: {this.state.slideCompletionValue}
        </Text>
      </View>
    );
  }
}


export default class ShowSlider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.screen}>
        <SliderExample />
        <SliderExample value={0.5} />
        <SliderExample  minimumValue={-1}  maximumValue={2} />
        <SliderExample step={0.25} />
        <SlidingCompleteExample />
        <SliderExample thumbImage={require('../images/uie_thumb_big.png')} />
        <SliderExample trackImage={require('../images/slider.png')} />
        <Back navigator={this.props.navigator} />
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  screen:{
    flex:1,
  },
  slider: {
    height: 10,
    margin: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
  },
});