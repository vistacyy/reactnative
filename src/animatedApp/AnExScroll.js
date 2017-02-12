import React,{Component} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class AnExScroll extends Component {
  constructor(props){
    super(props);
    this.state={
      scrollX: new Animated.Value(0)
    };
  }

  render() {
    let width = this.props.panelWidth;
    return (
      <View style={styles.container}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={16 /* get all events */ }
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: this.state.scrollX}}}]  // nested event mapping
          )}
          contentContainerStyle={{flex: 1, padding: 10}}
          pagingEnabled={true}
          horizontal={true}>
          <View style={[styles.page, {width}]}>
            <Image
              style={{width: 180, height: 180}}
              source={require('../images/baidu.png')}
            />
            <Text style={styles.text}>
              {'I\'ll find something to put here.'}
            </Text>
          </View>
          <View style={[styles.page, {width}]}>
            <Text style={styles.text}>{'And here.'}</Text>
          </View>
          <View style={[styles.page, {width}]}>
            <Text>{'But not here.'}</Text>
          </View>
        </ScrollView>
        <Animated.Image
          pointerEvents="none"
          style={[styles.bunny, {transform: [
            {translateX: this.state.scrollX.interpolate({
              inputRange: [0, width, 2 * width],
              outputRange: [0, 0, width / 3]}),          //  multi-part ranges
              extrapolate: 'clamp'},                     //  default is 'extend'
            {translateY: this.state.scrollX.interpolate({
              inputRange: [0, width, 2 * width],
              outputRange: [0, -200, -260]}),
              extrapolate: 'clamp'},
            {scale: this.state.scrollX.interpolate({
              inputRange: [0, width, 2 * width],
              outputRange: [0.5, 0.5, 2]}),
              extrapolate: 'clamp'},
          ]}]}
          source={require('../images/baidu.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  text: {
    padding: 4,
    paddingBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  bunny: {
    backgroundColor: 'transparent',
    position: 'absolute',
    height: 160,
    width: 160,
  },
  page: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
