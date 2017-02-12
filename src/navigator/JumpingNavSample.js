import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

let _getRandomRoute = function() {
  return {
    randNumber: Math.ceil(Math.random() * 1000),
  };
};

let ROUTE_STACK = [
  _getRandomRoute(),
  _getRandomRoute(),
  _getRandomRoute(),
];

let INIT_ROUTE_INDEX = 1;

class NavButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#B5B5B5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

export default class JumpingNavSample extends React.Component {
  render() {
    return (
      <Navigator
        debugOverlay={false}
        style={styles.appContainer}
        initialRoute={ROUTE_STACK[INIT_ROUTE_INDEX]}
        initialRouteStack={ROUTE_STACK}
        renderScene={this.renderScene}
        configureScene={() => {
          return Navigator.SceneConfigs.HorizontalSwipeJump;
        }}
      />
    );
  }

  renderScene = (route, navigator) => {
    let backBtn;
    let forwardBtn;
    if (ROUTE_STACK.indexOf(route) !== 0) {
      backBtn = (
        <NavButton
          onPress={() => {
            navigator.jumpBack();
          }}
          text="jumpBack"
        />
      );
    }
    if (ROUTE_STACK.indexOf(route) !== ROUTE_STACK.length - 1) {
      forwardBtn = (
        <NavButton
          onPress={() => {
            navigator.jumpForward();
          }}
          text="jumpForward"
        />
      );
    }
    return (
      <ScrollView style={styles.scene}>
        <Text style={styles.messageText}>#{route.randNumber}</Text>
        {backBtn}
        {forwardBtn}
        <NavButton
          onPress={() => {
            navigator.jumpTo(ROUTE_STACK[1]);
          }}
          text="jumpTo middle route"
        />
        <NavButton
          onPress={() => {
            this.props.navigator.push({
              message: 'Came from jumping example',
            });
          }}
          text="Nav Menu"
        />
      </ScrollView>
    );
  };
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  appContainer: {
    overflow: 'hidden',
    backgroundColor: '#dddddd',
    flex: 1,
  },
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
  tabs: {
    height: 50,
  }
});
