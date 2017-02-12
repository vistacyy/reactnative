import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

import Back from '../common/Back';

const colors = [ '#ff0000', '#00ff00', '#0000ff',];

const showHideTransitions = ['fade','slide',];

function getValue(values, index) {
  return values[index % values.length];
}

class StatusBarHiddenExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animated: true,
      hidden: false,
      showHideTransition: getValue(showHideTransitions, 0),
    };
  }

  _showHideTransitionIndex = 0;

  _onChangeAnimated = () => {
    this.setState({animated: !this.state.animated});
  };

  _onChangeHidden = () => {
    this.setState({hidden: !this.state.hidden});
  };

  _onChangeTransition = () => {
    this._showHideTransitionIndex++;
    this.setState({
      showHideTransition: getValue(showHideTransitions, this._showHideTransitionIndex),
    });
  };

  render() {
    return (
      <View>
        <StatusBar
          hidden={this.state.hidden}
          showHideTransition={this.state.showHideTransition}
          animated={this.state.animated}
        />
        <TouchableHighlight
          style={styles.wrapper}
          onPress={this._onChangeHidden}>
          <View style={styles.button}>
            <Text>hidden: {this.state.hidden ? 'true' : 'false'}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={this._onChangeAnimated}>
          <View style={styles.button}>
            <Text>animated (ios only): {this.state.animated ? 'true' : 'false'}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={this._onChangeTransition}>
          <View style={styles.button}>
            <Text>
              showHideTransition (ios only):
              '{getValue(showHideTransitions, this._showHideTransitionIndex)}'
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

class StatusBarBackgroundColorExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animated: true,
      backgroundColor: getValue(colors, 0),
    };
  }
  
  _colorIndex = 0;

  _onChangeBackgroundColor = () => {
    this._colorIndex++;
    this.setState({backgroundColor: getValue(colors, this._colorIndex)});
  };

  _onChangeAnimated = () => {
    this.setState({animated: !this.state.animated});
  };

  render() {
    return (
      <View>
        <StatusBar
          backgroundColor={this.state.backgroundColor}
          animated={this.state.animated}
        />
        <TouchableHighlight
          style={styles.wrapper}
          onPress={this._onChangeBackgroundColor}>
          <View style={styles.button}>
            <Text>backgroundColor: '{getValue(colors, this._colorIndex)}'</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={this._onChangeAnimated}>
          <View style={styles.button}>
            <Text>animated: {this.state.animated ? 'true' : 'false'}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default class ShowStatusBar extends Component {
  constructor(props) {
    super(props);
    this.state={
        language:'java',
        hidden: false,
        animated: true,
    };
  }
  render() {
    return (
      <View style={styles.screen}>
        <StatusBarHiddenExample />
        <StatusBarBackgroundColorExample />
        <Back navigator={this.props.navigator} />
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  screen:{
    flex:1,
  },
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#eeeeee',
    padding: 10,
  },
  title: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  }
});