import React,{Component} from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';

let NUM_BOBBLES = 5;
let RAD_EACH = Math.PI / 2 / (NUM_BOBBLES - 2);
let RADIUS = 160;
let BOBBLE_SPOTS = [...Array(NUM_BOBBLES)].map((_, i) => {  // static positions
  return i === 0 ? {x: 0, y: 0} : {                         // first bobble is the selector
    x: -Math.cos(RAD_EACH * (i - 1)) * RADIUS,
    y: -Math.sin(RAD_EACH * (i - 1)) * RADIUS,
  };
});

export default class AnExBobble extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.bobbles = BOBBLE_SPOTS.map((_, i) => {
      return new Animated.ValueXY();
    });
    this.state.selectedBobble = null;
    let bobblePanListener = (e, gestureState) => {     // async events => change selection
      let newSelected = computeNewSelected(gestureState);
      if (this.state.selectedBobble !== newSelected) {
        if (this.state.selectedBobble !== null) {
          let restSpot = BOBBLE_SPOTS[this.state.selectedBobble];
          Animated.spring(this.state.bobbles[this.state.selectedBobble], {
            toValue: restSpot,       // return previously selected bobble to rest position
          }).start();
        }
        if (newSelected !== null && newSelected !== 0) {
          Animated.spring(this.state.bobbles[newSelected], {
            toValue: this.state.bobbles[0],    // newly selected should track the selector
          }).start();
        }
        this.state.selectedBobble = newSelected;
      }
    };
    let releaseBobble = () => {
      this.state.bobbles.forEach((bobble, i) => {
        Animated.spring(bobble, {
          toValue: {x: 0, y: 0}           // all bobbles return to zero
        }).start();
      });
    };
    this.state.bobbleResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        BOBBLE_SPOTS.forEach((spot, idx) => {
          Animated.spring(this.state.bobbles[idx], {
            toValue: spot,                // spring each bobble to its spot
            friction: 3,                  // less friction => bouncier
          }).start();
        });
      },
      onPanResponderMove: Animated.event(
        [ null, {dx: this.state.bobbles[0].x, dy: this.state.bobbles[0].y} ],
        {listener: bobblePanListener}     // async state changes with arbitrary logic
      ),
      onPanResponderRelease: releaseBobble,
      onPanResponderTerminate: releaseBobble,
    });
  }

  render() {
    return (
      <View style={styles.bobbleContainer}>
        {this.state.bobbles.map((_, i) => {
          let j = this.state.bobbles.length - i - 1; // reverse so lead on top
          let handlers = j > 0 ? {} : this.state.bobbleResponder.panHandlers;
          return (
            <Animated.Image
              {...handlers}
              key={i}
              source={{uri: BOBBLE_IMGS[j]}}
              style={[styles.circle, {
                backgroundColor: randColor(),                             // re-renders are obvious
                transform: this.state.bobbles[j].getTranslateTransform(), // simple conversion
              }]}
            />
          );
        })}
      </View>
    );
  }
}

let styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 0.5,
  },
  bobbleContainer: {
    top: -68,
    paddingRight: 66,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
});

function computeNewSelected(  gestureState  ) {
  let {dx, dy} = gestureState;
  let minDist = Infinity;
  let newSelected = null;
  let pointRadius = Math.sqrt(dx * dx + dy * dy);
  if (Math.abs(RADIUS - pointRadius) < 80) {
    BOBBLE_SPOTS.forEach((spot, idx) => {
      let delta = {x: spot.x - dx, y: spot.y - dy};
      let dist = delta.x * delta.x + delta.y * delta.y;
      if (dist < minDist) {
        minDist = dist;
        newSelected = idx;
      }
    });
  }
  return newSelected;
}

function randColor()  {
  let colors = [0,1,2].map(() => Math.floor(Math.random() * 150 + 100));
  return 'rgb(' + colors.join(',') + ')';
}

let BOBBLE_IMGS = [
  'https://scontent-sea1-1.xx.fbcdn.net/hphotos-xpf1/t39.1997-6/10173489_272703316237267_1025826781_n.png',
  'https://scontent-sea1-1.xx.fbcdn.net/hphotos-xaf1/l/t39.1997-6/p240x240/851578_631487400212668_2087073502_n.png',
  'https://scontent-sea1-1.xx.fbcdn.net/hphotos-xaf1/t39.1997-6/p240x240/851583_654446917903722_178118452_n.png',
  'https://scontent-sea1-1.xx.fbcdn.net/hphotos-xaf1/t39.1997-6/p240x240/851565_641023175913294_875343096_n.png',
  'https://scontent-sea1-1.xx.fbcdn.net/hphotos-xaf1/t39.1997-6/851562_575284782557566_1188781517_n.png',
];
