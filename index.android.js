import React, { Component } from 'react';
import{ AppRegistry,Navigator,Text, TouchableHighlight} from 'react-native';
import Main from './src/Main';
// import codePush from "react-native-code-push";

class Test extends Component {

  constructor(props){
    super(props);
  }

  render() {
    let defaultName='Main';
    let defaultComponent=Main;
    return( 
      <Navigator
        initialRoute={{name:defaultName,component:defaultComponent}}
        configureScene={(route) =>{
           return Navigator.SceneConfigs.VerticalDownSwipeJump;
        }}
        renderScene={(route,navigator) => {
          let Component = route.component;
          return <Component {...route.params} navigator={navigator} />
        }}
      />  
    );
  }
}

// Test = codePush(Test);

AppRegistry.registerComponent('Test', () => Test);