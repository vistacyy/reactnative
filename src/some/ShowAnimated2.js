import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Back from '../common/Back';

export default class ShowAnimated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anim: new Animated.Value(0.5), // init opacity 0
    };
  }
  componentDidMount() {
    Animated.spring(this.state.anim, {
      toValue: 0,   // Returns to the start
      velocity: 3,  // Velocity makes it move
      tension: -10, // Slow
      friction: 1,  // Oscillate a lot
    }).start();

  }

  render() {
    return (
      <View style={styles.screen}>
        <Animated.View
          style={[styles.content, {
            transform: [   // Array order matters
              {
                scale: this.state.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 4],
                })
              },
              {
                translateX: this.state.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 500],
                })
              },
              {
                rotate: this.state.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    '0deg', '360deg' // 'deg' or 'rad'
                  ],
                })
              },
            ]
          }
          ]}>
          <Text>Transforms!</Text>
        </Animated.View>
        <Back navigator={this.props.navigator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 30,
    flex: 1,
  },
  content: {
    backgroundColor: 'deepskyblue',
    borderWidth: 1,
    borderColor: 'dodgerblue',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});