import React, { Component } from 'react';
import {
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'

class NavButton extends Component {
  constructor(props) {
    super(props);
  }

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

let NavigationBarRouteMapper = {

  LeftButton: function (route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    let previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.title}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function (route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={() => navigator.push(newRandomRoute())}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Next
        </Text>
      </TouchableOpacity>
    );
  },

  Title: function (route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}[{index}]
      </Text>
    );
  },

};

function newRandomRoute() {
  return {
    title: '#' + Math.ceil(Math.random() * 1000),
  };
}

export default class NavigationBarSample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navigator
        style={styles.appContainer}
        initialRoute={newRandomRoute()}
        renderScene={(route, navigator) => (
          <ScrollView style={styles.scene}>
            <Text style={styles.messageText}>{route.title}</Text>
            <NavButton
              onPress={() => {
                navigator.immediatelyResetRouteStack([
                  newRandomRoute(),
                  newRandomRoute(),
                  newRandomRoute(),
                ]);
              } }
              text="Reset w/ 3 scenes"
              />
            <NavButton
              onPress={() => {
                this.props.navigator.pop();
              } }
              text="Exit NavigationBar Example"
              />
          </ScrollView>
        )}

        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
            />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
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
  navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: '#373E4D',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: '#5890FF',
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
});