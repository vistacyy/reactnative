import React, { Component } from 'react';
import {
  Modal,
  Picker,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Back from '../common/Back';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  _onHighlight = () => {
    this.setState({ active: true });
  };

  _onUnhighlight = () => {
    this.setState({ active: false });
  };

  render() {
    let colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor="#a9d9d4">
        <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
}

const supportedOrientationsPickerValues = [
  ['portrait'],
  ['landscape'],
  ['landscape-left'],
  ['portrait', 'landscape-right'],
  ['portrait', 'landscape'],
  [],
];


export default class ShowKeyboardAvoidingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationType: 'none',
      modalVisible: false,
      transparent: false,
      selectedSupportedOrientation: 0,
      currentOrientation: 'unknown',
    };
  }

  _setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  _setAnimationType = (type) => {
    this.setState({ animationType: type });
  };

  _toggleTransparent = () => {
    this.setState({ transparent: !this.state.transparent });
  };

  render() {
    let modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    let innerContainerTransparentStyle = this.state.transparent
      ? { backgroundColor: '#fff', paddingVertical: 20 }
      : null;
    let activeButtonStyle = {
      backgroundColor: '#ddd'
    };

    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => this._setModalVisible(false)}
          supportedOrientations={supportedOrientationsPickerValues[this.state.selectedSupportedOrientation]}
          onOrientationChange={evt => this.setState({ currentOrientation: evt.nativeEvent.orientation })}
          >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <Text>This modal was presented {this.state.animationType === 'none' ? 'without' : 'with'} animation.</Text>
              <Text>It is currently displayed in {this.state.currentOrientation} mode.</Text>
              <Button
                onPress={this._setModalVisible.bind(this, false)}
                style={styles.modalButton}>
                Close
              </Button>
            </View>
          </View>
        </Modal>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>Animation Type</Text>
          <Button onPress={this._setAnimationType.bind(this, 'none')} style={this.state.animationType === 'none' ? activeButtonStyle : {}}>
            none
          </Button>
          <Button onPress={this._setAnimationType.bind(this, 'slide')} style={this.state.animationType === 'slide' ? activeButtonStyle : {}}>
            slide
          </Button>
          <Button onPress={this._setAnimationType.bind(this, 'fade')} style={this.state.animationType === 'fade' ? activeButtonStyle : {}}>
            fade
          </Button>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowTitle}>Transparent</Text>
          <Switch value={this.state.transparent} onValueChange={this._toggleTransparent} />
        </View>

        <View>
          <Text style={styles.rowTitle}>Supported orientations</Text>
          <Picker
            selectedValue={this.state.selectedSupportedOrientation}
            onValueChange={(_, i) => this.setState({ selectedSupportedOrientation: i })}
            itemStyle={styles.pickerItem}
            >
            <Picker.Item label="Portrait" value={0} />
            <Picker.Item label="Landscape" value={1} />
            <Picker.Item label="Landscape left" value={2} />
            <Picker.Item label="Portrait and landscape right" value={3} />
            <Picker.Item label="Portrait and landscape" value={4} />
            <Picker.Item label="Default supportedOrientations" value={5} />
          </Picker>
        </View>

        <Button onPress={this._setModalVisible.bind(this, true)}>
          Present
        </Button>

        <View style={{ flex: 1 }}></View>
        <Back navigator={this.props.navigator} />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flexGrow: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
  pickerItem: {
    fontSize: 16,
  },
});
