
import React,{Component} from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';

export default class AnExChained extends Component {

  constructor(prop) {
    super(props);
    this.state = {
      stickers: [new Animated.ValueXY()],                    // 1 leader
    };
    let stickerConfig = {tension: 2, friction: 3};           // soft spring
    for (let i = 0; i < 4; i++) {                            // 4 followers
      let sticker = new Animated.ValueXY();
      Animated.spring(sticker, {
        ...stickerConfig,
        toValue: this.state.stickers[i],               // Animated toValue's are tracked
      }).start();
      this.state.stickers.push(sticker);               // push on the followers
    }
    let releaseChain = (e, gestureState) => {
      this.state.stickers[0].flattenOffset();          // merges offset into value and resets
      Animated.sequence([                              // spring to start after decay finishes
        Animated.decay(this.state.stickers[0], {       // coast to a stop
          velocity: {x: gestureState.vx, y: gestureState.vy},
          deceleration: 0.997,
        }),
        Animated.spring(this.state.stickers[0], {
          toValue: {x: 0, y: 0}                        // return to start
        }),
      ]).start();
    };
    this.state.chainResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.stickers[0].stopAnimation((value) => {
          this.state.stickers[0].setOffset(value);           // start where sticker animated to
          this.state.stickers[0].setValue({x: 0, y: 0});     // avoid flicker before next event
        });
      },
      onPanResponderMove: Animated.event(
        [null, {dx: this.state.stickers[0].x, dy: this.state.stickers[0].y}] // map gesture to leader
      ),
      onPanResponderRelease: releaseChain,
      onPanResponderTerminate: releaseChain,
    });
  }

  render() {
    return (
      <View style={styles.chained}>
        {this.state.stickers.map((_, i) => {
          let j = this.state.stickers.length - i - 1; // reverse so leader is on top
          let handlers = (j === 0) ? this.state.chainResponder.panHandlers : {};
          return (
            <Animated.Image
              {...handlers}
              key={i}
              source={{uri: CHAIN_IMGS[j]}}
              style={[styles.sticker, {
                transform: this.state.stickers[j].getTranslateTransform(), // simple conversion
              }]}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chained: {
    alignSelf: 'flex-end',
    top: -160,
    right: 126
  },
  sticker: {
    position: 'absolute',
    height: 120,
    width: 120,
    backgroundColor: 'transparent',
  },
});

const CHAIN_IMGS = [
  'https://www.baidu.com/img/bd_logo1.png',
  'https://www.baidu.com/img/bd_logo1.png',
  'https://www.baidu.com/img/bd_logo1.png',
  'https://www.baidu.com/img/bd_logo1.png',
  'https://www.baidu.com/img/bd_logo1.png',
  'https://www.baidu.com/img/bd_logo1.png',
];