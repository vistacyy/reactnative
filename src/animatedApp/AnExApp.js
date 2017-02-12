
import React, { Component } from 'react';
import {
  Animated,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import AnExSet from './AnExSet';
import Back from '../common/Back';
// 设置初始圆参数
const CIRCLE_SIZE = 80;
const CIRCLE_MARGIN = 18;
const NUM_CIRCLES = 6;


class Circle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      pan: new Animated.ValueXY(), // Vectors reduce boilerplate.  (step1: uncomment)
      pop: new Animated.Value(0),  // Initial value.               (step2a: uncomment)
    };
    this._onLongPress = this._onLongPress.bind(this);
    this._toggleIsActive = this._toggleIsActive.bind(this);
  }

  _onLongPress() {
    let config = { tension: 40, friction: 3 };
    this.state.pan.addListener((value) => {  // Async listener for state changes  (step1: uncomment)
      this.props.onMove && this.props.onMove(value);
    });
    Animated.spring(this.state.pop, {
      toValue: 1,                  //  Pop to larger size.                      (step2b: uncomment)
      ...config,                   //  Reuse config for convenient consistency  (step2b: uncomment)
    }).start();
    this.setState({
      panResponder: PanResponder.create({
        onPanResponderMove: Animated.event([
          null,                                         // native event - ignore      (step1: uncomment)
          { dx: this.state.pan.x, dy: this.state.pan.y }, // links pan to gestureState  (step1: uncomment)
        ]),
        onPanResponderRelease: (e, gestureState) => {
          LayoutAnimation.easeInEaseOut();  // @flowfixme animates layout update as one batch (step3: uncomment)
          Animated.spring(this.state.pop, {
            toValue: 0,                     // Pop back to 0                       (step2c: uncomment)
            ...config,
          }).start();
          this.setState({ panResponder: undefined });
          this.props.onMove && this.props.onMove({
            x: gestureState.dx + this.props.restLayout.x,
            y: gestureState.dy + this.props.restLayout.y,
          });
          this.props.onDeactivate();
        },
      })
    }, () => {
      this.props.onActivate();
    });
  }

  _toggleIsActive(velocity) {
    let config = { tension: 30, friction: 7 };
    if (this.state.isActive) {
      Animated.spring(this.props.openVal, { toValue: 0, ...config }).start(() => { // (step4: uncomment)
        this.setState({ isActive: false }, this.props.onDeactivate);
      });                                                                        // (step4: uncomment)
    } else {
      this.props.onActivate();
      this.setState({ isActive: true, panResponder: undefined }, () => {
        Animated.spring(this.props.openVal, { toValue: 1, ...config }).start();    // (step4: uncomment)
      });
    }
  }

  render() {
    if (this.state.panResponder) {
      let handlers = this.state.panResponder.panHandlers;
      var dragStyle = {                 //  Used to position while dragging
        position: 'absolute',           //  Hoist out of layout                    (step1: uncomment)
        ...this.state.pan.getLayout(),  //  Convenience converter                  (step1: uncomment)
      };
    } else {
      handlers = {
        onStartShouldSetResponder: () => !this.state.isActive,
        onResponderGrant: () => {
          this.state.pan.setValue({ x: 0, y: 0 });           // reset                (step1: uncomment)
          this.state.pan.setOffset(this.props.restLayout); // offset from onLayout (step1: uncomment)
          this.longTimer = setTimeout(this._onLongPress, 300);
        },
        onResponderRelease: () => {
          if (!this.state.panResponder) {
            clearTimeout(this.longTimer);
            this._toggleIsActive();
          }
        }
      };
    }
    let animatedStyle = {
      shadowOpacity: this.state.pop,    // no need for interpolation            (step2d: uncomment)
      transform: [
        {
          scale: this.state.pop.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.3]         // scale up from 1 to 1.3               (step2d: uncomment)
          })
        },
      ],
    };
    let openVal = this.props.openVal;
    if (this.props.dummy) {
      animatedStyle.opacity = 0;
    } else if (this.state.isActive) {
      var innerOpenStyle = [styles.open, {                                 // (step4: uncomment)
        left: openVal.interpolate({ inputRange: [0, 1], outputRange: [this.props.restLayout.x, 0] }),
        top: openVal.interpolate({ inputRange: [0, 1], outputRange: [this.props.restLayout.y, 0] }),
        width: openVal.interpolate({ inputRange: [0, 1], outputRange: [CIRCLE_SIZE, this.props.containerLayout.width] }),
        height: openVal.interpolate({ inputRange: [0, 1], outputRange: [CIRCLE_SIZE, this.props.containerLayout.height] }),
        margin: openVal.interpolate({ inputRange: [0, 1], outputRange: [CIRCLE_MARGIN, 0] }),
        borderRadius: openVal.interpolate({ inputRange: [-0.15, 0, 0.5, 1], outputRange: [0, CIRCLE_SIZE / 2, CIRCLE_SIZE * 1.3, 0] }),
      }];
    }
    return (
      <Animated.View
      
        onLayout={this.props.onLayout}
        style={[styles.dragView, dragStyle, animatedStyle, this.state.isActive ? styles.open : null]}
        {...handlers}>
        <Animated.View style={[styles.circle, innerOpenStyle]}>
  <Text style={{color:'red'}} onPress={()=>{this._toggleIsActive()}}>{this.props.id}</Text>
        {/*
          <AnExSet
            containerLayout={this.props.containerLayout}
            id={this.props.id}
            isActive={this.state.isActive}
            openVal={this.props.openVal}
            onDismiss={this._toggleIsActive}
            />*/}
        </Animated.View>
      </Animated.View>
    );
  }
}

export default class AnExApp extends Component {
  constructor(props) {
    super(props);
    let keys = [];
    for (let idx = 0; idx < NUM_CIRCLES; idx++) {
      keys.push('E' + idx);
    }
    /**
     * 初始化后的state
     * keys:Array[6] 用来生成圆的数组,上面代码生成['E0','E1',...]
     * restLayouts:Array[6] 根据数组元素生成圆的onLayout {x,y,width,height}
     * openVal:AnimatedValue 内置动画对象
     * layout:Object  view的onLayout
     */
    this.state = {
      keys,
      restLayouts: [],
      openVal: new Animated.Value(0),
    };
    this._onMove = this._onMove.bind(this);
  }

  componentDidMount() {
    // console.info('当前状态',this);
  }
  
  // 移动元素后重新渲染布局
  _onMove(position) {
    let newKeys = moveToClosest(this.state, position);
    if (newKeys !== this.state.keys) {
      LayoutAnimation.easeInEaseOut();  // animates layout update as one batch (step3: uncomment)
      this.setState({ keys: newKeys });
    }
  }
  render() {
    let circles = this.state.keys.map((key, idx) => {
      if (key === this.state.activeKey) {
        return <Circle key={key + 'd'} dummy={true} />;
      } else {
        if (!this.state.restLayouts[idx]) { //初始化时View调用生成 restLayouts:Array[6]
          var onLayout = function (index, e) { // 在{}中不能使用let
            let layout = e.nativeEvent.layout;
            this.setState((state) => {
              state.restLayouts[index] = layout;
              return state;
            });
          }.bind(this, idx); //绑定时传入idx给index
        }
        return (
          <Circle
            key={key}
            id={key}
            openVal={this.state.openVal}
            onLayout={onLayout}
            restLayout={this.state.restLayouts[idx]}
            onActivate={this.setState.bind(this, {
              activeKey: key,
              activeInitialLayout: this.state.restLayouts[idx],
            })}
            />
        );
      }
    });
    if (this.state.activeKey) {
      circles.push(
        <Animated.View key="dark" style={[styles.darkening, { opacity: this.state.openVal }]} />
      );
      circles.push(
        <Circle
          key={this.state.activeKey}
          id={this.state.activeKey}
          openVal={this.state.openVal}
          restLayout={this.state.activeInitialLayout}
          containerLayout={this.state.layout}
          onMove={this._onMove}
          onDeactivate={() => { this.setState({ activeKey: undefined }); } }
          />
      );
    }
    // console.info('Circles',circles);
    return (
      <View style={styles.container}>
        <View style={styles.grid} onLayout={(e) => this.setState({ layout: e.nativeEvent.layout })}>
          {circles}
        </View>
        <Back navigator={this.props.navigator} />
      </View>
    );
  }
}
// 两点间距
function distance(p1, p2) {
  let dx = p1.x - p2.x;
  let dy = p1.y - p2.y;
  return dx * dx + dy * dy;
}
/**
 * 根据被移动的元素到新位置距离返回数组
 * activeKey 激活的元素string
 * keys 所有元素数组
 * restLayouts 每个元素的{x,y,width,height}
 * position 被移动到新的位置{x,y}
 */
function moveToClosest({activeKey, keys, restLayouts}, position) {
  let activeIdx = -1;
  let closestIdx = activeIdx;
  let minDist = Infinity;
  let newKeys = [];
  // 把移动的元素放到新位置最近的元素后，返回newKeys
  keys.forEach((key, idx) => {
    let dist = distance(position, restLayouts[idx]);
    if (key !== activeKey) {
    //   idx = activeIdx;
    // } else {
      newKeys.push(key);
    }
    if (dist < minDist) {
      minDist = dist;
      closestIdx = idx;
    }
  });
  if (closestIdx === activeIdx) {
    return keys; // nothing changed
  } else {
    newKeys.splice(closestIdx, 0, activeKey);
    return newKeys;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 1,
    borderColor: 'black',
    margin: CIRCLE_MARGIN,
    overflow: 'hidden',
justifyContent:'center',
alignItems:'center',
  },
  dragView: {
    shadowRadius: 10,
    shadowColor: 'rgba(0,0,0,0.7)',
    shadowOffset: { height: 8 },
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
  },
  open: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: undefined, // unset value from styles.circle
    height: undefined, // unset value from styles.circle
    borderRadius: 0, // unset value from styles.circle
  },
  darkening: {
    backgroundColor: '#000a',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});
