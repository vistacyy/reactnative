import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  CameraRoll,
  Image,
} from 'react-native';

import Back from '../common/Back';

export default class ShowCameraRoll extends Component {
  constructor(props) {
    super(props);
    this.state={
      images:undefined,
    };
  }

  //获取相册图片
  componentDidMount() {
    let fetchParams = {
      first: 5,
      assetType: 'Photos',
    };

    CameraRoll.getPhotos(fetchParams).then((data) => {
      console.info('data', data);
      this.setState({ images: data.edges });
    }, (e) => {
      console.info('e', e);
    });
  }
  //显示图片
  showImage = () => {
    if (this.state.images.length > 1) {
      return this.state.images.map((asset, index) => {
        return <Image
          key={index}
          source={asset.node.image}
          style={{ width: 50, height: 50 }}
          />;
      });
    }
    return null;
  };

  render() {


    return (
      <View style={styles.screen}>
        {this.state.images &&
          <View style={{ flexDirection: 'row' }}>{this.showImage()}</View>
        }
        <View style={{ flex: 1 }}></View>
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