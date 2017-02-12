import React, { Component } from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Back from '../common/Back';

const GreenSquare = () =>
  <View style={styles.greenSquare}>
    <Text>Green square</Text>
  </View>;

const BlueSquare = () =>
  <View style={styles.blueSquare}>
    <Text>Blue square</Text>
  </View>;

export default class ShowAnimated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
    };
  }

  _onPressToggle = () => {
    LayoutAnimation.linear();
    this.setState((state) => ({ toggled: !state.toggled }));
  }

  render() {
    return (
      <View style={styles.screen}>

        <TouchableOpacity onPress={this._onPressToggle}>
          <View style={styles.button}>
            <Text>Toggle</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.viewContainer}>
          {
            this.state.toggled ?
              <GreenSquare /> :
              <BlueSquare />
          }
        </View>

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
  container: {
    flex: 1,
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#eeeeee',
    padding: 10,
    marginBottom: 10,
  },

  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  greenSquare: {
    width: 150,
    height: 150,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueSquare: {
    width: 150,
    height: 150,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});