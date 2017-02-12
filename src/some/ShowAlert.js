import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  View,
} from 'react-native';
import Back from '../common/Back';

export default class ShowAlert extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let alertMessage = 'Credibly reintermediate next-generation potentialities after goal-oriented ' +
      'catalysts for change. Dynamically revolutionize.';
    return (
      <View style={styles.screen}>
        <TouchableHighlight style={styles.wrapper}
          onPress={() => Alert.alert(
            'Alert Title',
            alertMessage,
          )}>
          <View style={styles.button}>
            <Text>Alert with message and default button</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.wrapper}
          onPress={() => Alert.alert(
            'Alert Title',
            alertMessage,
            [
              { text: 'OK', onPress: () => console.log('OK Pressed!') },
            ]
          )}>
          <View style={styles.button}>
            <Text>Alert with one button</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.wrapper}
          onPress={() => Alert.alert(
            'Alert Title',
            alertMessage,
            [
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
              { text: 'OK', onPress: () => console.log('OK Pressed!') },
            ]
          )}>
          <View style={styles.button}>
            <Text>Alert with two buttons</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.wrapper}
          onPress={() => Alert.alert(
            'Alert Title',
            null,
            [
              { text: 'Foo', onPress: () => console.log('Foo Pressed!') },
              { text: 'Bar', onPress: () => console.log('Bar Pressed!') },
              { text: 'Baz', onPress: () => console.log('Baz Pressed!') },
            ]
          )}>
          <View style={styles.button}>
            <Text>Alert with three buttons</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.wrapper}
          onPress={() => Alert.alert(
            'Foo Title',
            alertMessage,
            '..............'.split('').map((dot, index) => ({
              text: 'Button ' + index,
              onPress: () => console.log('Pressed ' + index)
            }))
          )}>
          <View style={styles.button}>
            <Text>Alert with too many buttons</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.wrapper}
          onPress={() => Alert.alert(
            'Alert Title',
            null,
            [
              { text: 'OK', onPress: () => console.log('OK Pressed!') },
            ],
            {
              cancelable: false
            }
          )}>
          <View style={styles.button}>
            <Text>Alert that cannot be dismissed</Text>
          </View>
        </TouchableHighlight>
        <View style={{flex:1}}></View>
        <ActivityIndicator
          size="large"
          color="#ff0"
          />
        <Back navigator={this.props.navigator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#eeeeee',
    padding: 10,
  },
});