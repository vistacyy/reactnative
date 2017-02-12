import React, { Component } from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Back from '../common/Back';

export default class ShowAnimated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      views: [],
    };
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  _onPressAddView = () => {
    this.setState((state) => ({ views: [...state.views, {}] }));
  }

  _onPressRemoveView = () => {
    this.setState((state) => ({ views: state.views.slice(0, -1) }));
  }

  render() {
    const views = this.state.views.map((view, i) =>
      <View key={i} style={styles.view}>
        <Text>{i}</Text>
      </View>
    );

    return (
      <View style={styles.screen}>

        <TouchableOpacity onPress={this._onPressAddView}>
          <View style={styles.button}>
            <Text>Add view</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._onPressRemoveView}>
          <View style={styles.button}>
            <Text>Remove view</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.viewContainer}>
          {views}
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
  view: {
    height: 54,
    width: 54,
    backgroundColor: 'red',
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});