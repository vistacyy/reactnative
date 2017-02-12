import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  DrawerLayoutAndroid,
  Alert,
  Button,
} from 'react-native';

import Back from '../common/Back';

export default class ShowDrawerLayoutAndroid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let navigationView = <View style={{ flex: 1,alignItems:'center',justifyContent:'center', backgroundColor: '#fff' }}>
      <Button
        onPress={() => { this.drawer.closeDrawer() } }
        style={{ margin: 10, fontSize: 15, textAlign: 'left' }}
        title="I'm in the Drawer!"
        />
    </View>;

    return (
      <View style={styles.screen}>
        <DrawerLayoutAndroid
          ref={drawer => { this.drawer = drawer } }
          drawerBackgroundColor ="rgba(0,255,255,0.7)"
          drawerWidth={200}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}
          onDrawerOpen={() => { Alert.alert('onDrawerOpen') } }
          onDrawerClose={() => { Alert.alert('onDrawerClose') } }
          >
          <View style={{ flex: 1, alignItems:'center',justifyContent:'center', }}>
            <Button
              onPress={() => { this.drawer.openDrawer() } }
              style={{ margin: 10, fontSize: 15, textAlign: 'right' }}
              title='从左边拉开drawer'
              />
          </View>
        </DrawerLayoutAndroid>
        <Back navigator={this.props.navigator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
