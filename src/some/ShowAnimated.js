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
      fadeAnim: new Animated.Value(0), // init opacity 0
    };
  }
  componentDidMount() {
    Animated.timing(          // Uses easing functions
      this.state.fadeAnim,    // The value to drive
      {
        toValue: 1,            // Configuration
        duration: 3000,
      },
    ).start();                // Don't forget start!
  }
  render() {
    return (
      <View style={styles.screen}>
        <Animated.View
          style={{
            opacity: this.state.fadeAnim, // Binds directly
            transform: [{
              translateY: this.state.fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
              }),
            }],
            height: 50,
            backgroundColor: 'red',
          }}>
          <Text style={styles.text}>Don't forget start!</Text>

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