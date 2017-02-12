import React, { Component } from 'react';
import {
  AppState,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import Back from '../common/Back';


class AppStateSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      previousAppStates: [],
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (appState) => {
    let previousAppStates = this.state.previousAppStates.slice();
    previousAppStates.push(this.state.appState);
    this.setState({
      appState,
      previousAppStates,
    });
    console.info('ShowAppState==_handle==>',this.state.appState+Math.random());
  };

  render() {
    if (this.props.showCurrentOnly) {
      return (
        <View>
          <Text>{this.state.appState}</Text>
        </View>
      );
    }
    return (
      <View>
        <Text>{JSON.stringify(this.state.previousAppStates)}</Text>
      </View>
    );
  }
}

export default class ShowAppState extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.screen}>
        <AppStateSubscription />
        <AppStateSubscription showCurrentOnly={true} />
        <Back navigator={this.props.navigator} />
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  screen:{
    flex:1,
  },
});