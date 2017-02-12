import React, { Component } from 'react';
import {
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';

import Back from '../common/Back';

const CIRCLE_SIZE = 80;

export default class ShowPanResponder extends Component {
  constructor(props) {
    super(props);
    this._panResponder = {};
    this._previousLeft = 0;
    this._previousTop = 0;
    this._circleStyles = {};
    this.circle = {};
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
    this._previousLeft = 20;
    this._previousTop = 84;
    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop,
        backgroundColor: 'green',
      }
    };
  }

  componentDidMount() {
    this._updateNativeStyles();
  }

  _highlight() {
    this._circleStyles.style.backgroundColor = 'blue';
    this._updateNativeStyles();
  }

  _unHighlight() {
    this._circleStyles.style.backgroundColor = 'green';
    this._updateNativeStyles();
  }

  _updateNativeStyles() {
    this.circle && this.circle.setNativeProps(this._circleStyles);
  }

  _handleStartShouldSetPanResponder(e, gestureState) {
    // Should we become active when the user presses down on the circle?
    return true;
  }
  _handleMoveShouldSetPanResponder(e, gestureState) {
    // Should we become active when the user moves a touch over the circle?
    return true;
  }

  _handlePanResponderGrant = (e, gestureState) => {
    this._highlight();
  }
  _handlePanResponderMove = (e, gestureState) => {
    this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;
    this._updateNativeStyles();
  }
  _handlePanResponderEnd = (e, gestureState) => {
    this._unHighlight();
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
  }

  render() {
    return (
      <View style={styles.container}>

        <View
          ref={(circle) => { this.circle = circle } }
          style={styles.circle}
          {...this._panResponder.panHandlers}
          />
        <View style={{ flex: 1 }}></View>
        <Back navigator={this.props.navigator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 64,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },

});