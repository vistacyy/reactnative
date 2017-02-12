import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Navigator,
} from 'react-native'
import JumpingNavSample from './JumpingNavSample';
import NavigationBarSample from './NavigationBarSample';
import BreadcrumbNavSample from './BreadcrumbNavSample';

//公用导航按钮
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

//导航主体页面
class NavMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  //观察内Navigator路由栈的变化
  // componentDidMount() {
  //   console.info('ShowNavigator=DidMoun=>NavMenu',this.props.navigator.getCurrentRoutes());
  // }

  // componentWillUnmount() {
  //   console.info('ShowNavigator=WillUnmount=>NavMenu',this.props.navigator.getCurrentRoutes());
  // }

  render() {
    return (
      <ScrollView style={styles.scene}>
        <Text style={styles.messageText}>{this.props.message}</Text>
        <NavButton
          onPress={() => {
            this.props.navigator.push({
              message: 'Swipe right to dismiss',
              sceneConfig: Navigator.SceneConfigs.FloatFromRight,
            });
          }}
          text="Float in from right"
        />
        <NavButton
          onPress={() => {
            this.props.navigator.push({
              message: 'Swipe down to dismiss',
              sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            });
          }}
          text="Float in from bottom"
        />
        <NavButton
          onPress={() => {
            this.props.navigator.pop();
          }}
          text="Pop"
        />
        <NavButton
          onPress={() => {
            this.props.navigator.popToTop();
          }}
          text="Pop to top"
        />
        <NavButton
          onPress={() => {
            this.props.navigator.push({ id: 'navbar' });
          }}
          text="Navbar Example"
        />
        <NavButton
          onPress={() => {
            this.props.navigator.push({ id: 'jumping' });
          }}
          text="Jumping Example"
        />
        <NavButton
          onPress={() => {
            this.props.navigator.push({ id: 'breadcrumbs' });
          }}
          text="Breadcrumbs Example"
        />
        <NavButton
          onPress={() => {
            this.props.outerNavigator.pop();
          }}
          text="Exit <Navigator> Example"
        />
      </ScrollView>
    );
  }
}

//内容导航容器
export default class ShowNavigator extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   console.info('ShowNavigator==>didMount',this.props.navigator.getCurrentRoutes());
  // }

  renderScene = (route, nav) => {
    switch (route.id) {
      case 'navbar':
        return <NavigationBarSample navigator={nav} />;
      case 'breadcrumbs':
        return <BreadcrumbNavSample navigator={nav} />;
      case 'jumping':
        return <JumpingNavSample navigator={nav} outerNavigator={this.props.navigator} />;
      default:
        return (
          <NavMenu
            message={route.message}
            navigator={nav}
            outerNavigator={this.props.navigator}
          />
        );
    }
  };

  render() {
    return (
      <Navigator
        
        style={styles.container}
        initialRoute={{ message: 'First Scene', }}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromBottom;
        }}
      />
    );
  }
}


const styles = StyleSheet.create({
	content: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#EBEBEB',
		flex: 1
	},
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  container: {
    flex: 1,
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
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
});