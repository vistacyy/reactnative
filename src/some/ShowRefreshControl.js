import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native';

import Back from '../common/Back';

class Row extends React.Component {
  _onClick = () => {
    this.props.onClick(this.props.data);
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this._onClick} >
        <View style={styles.row}>
          <Text style={styles.text}>
            {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default class ShowRefreshControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      loaded: 0,
      rowData: Array.from(new Array(5)).map(
        (val, i) => ({ text: 'Initial row ' + i, clicks: 0 })),
    };
  }

  _onClick = (row) => {

    // console.info(row);

    row.clicks++;
    this.setState({
      rowData: this.state.rowData,
    });
  }

  _onRefresh = () => {
    this.setState({ isRefreshing: true });
    this.timer = setTimeout(() => {
      const rowData = Array.from(new Array(2)).map((val, i) => ({
        text: 'Loaded row ' + (+this.state.loaded + i),
        clicks: 0,
      })).reverse().concat(this.state.rowData);

      this.setState({
        loaded: this.state.loaded + 2,
        isRefreshing: false,
        rowData: rowData,
      });
    }, 2000);
  }

  render() {
    const rows = this.state.rowData.map((row, ii) => {
      return <Row key={ii} data={row} onClick={this._onClick} />;
    });
    return (
      <View style={styles.screen}>
        <ScrollView
          style={styles.scrollview}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#ff0000"
              title="Loading..."
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffff00"
              />
          }>
          {rows}
        </ScrollView>
        <Back navigator={this.props.navigator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  row: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 20,
    backgroundColor: '#3a5795',
    margin: 5,
  },
  text: {
    alignSelf: 'center',
    color: '#fff',
  },
  scrollview: {
    flex: 1,
    marginBottom: 45,
  },
});