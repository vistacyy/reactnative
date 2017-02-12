import React, { Component } from 'react';
import {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';

import Back from '../common/Back';

const THUMB_URLS = [
  require('./Thumbnails/like.png'),
  require('./Thumbnails/dislike.png'),
  require('./Thumbnails/call.png'),
  require('./Thumbnails/fist.png'),
  require('./Thumbnails/bandaged.png'),
  require('./Thumbnails/flowers.png'),
  require('./Thumbnails/heart.png'),
  require('./Thumbnails/liking.png'),
  require('./Thumbnails/party.png'),
  require('./Thumbnails/poke.png'),
  require('./Thumbnails/superlike.png'),
  require('./Thumbnails/victory.png'),
];

let LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.';

let hashCode = function (str) {
  let hash = 15;
  for (let ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

export default class ShowListView1 extends Component {
  constructor(props) {
    super(props);
    this._pressData = {};
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(this._genRows({})),
    };

    this.renderRow = this._renderRow.bind(this);
    this.genRows = this._genRows.bind(this);
    this.pressRow = this._pressRow.bind(this);
    this.renderSeparator = this._renderSeparator.bind(this);

  }
  // highlightRow高亮参数行
  _renderRow(rowData, sectionID, rowID, highlightRow) {
    var rowHash = Math.abs(hashCode(rowData));
    var imgSource = THUMB_URLS[rowHash % THUMB_URLS.length];
    return (
      <TouchableHighlight onPress={() => {
        this._pressRow(rowID);
        highlightRow(sectionID, rowID);
      } }>
        <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={imgSource} />
            <Text style={styles.text}>
              {rowData + ' - ' + LOREM_IPSUM.substr(0, rowHash % 301 + 10)}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  // 产生10个Row+index元素的数组，参数为{{index:true/false}...},为true时加上(pressed)
  _genRows(pressData) {
    let dataBlob = [];
    for (let ii = 0; ii < 10; ii++) {
      let pressedText = pressData[ii] ? ' (pressed)' : '';
      dataBlob.push('Row ' + ii + pressedText);
    }
    return dataBlob;
  }
  // 根据rowID改变是否被按的状态，更新数据源
  _pressRow(rowID) {
    this._pressData[rowID] = !this._pressData[rowID];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        this._genRows(this._pressData)
      )
    });
  }
  // Row高亮时（被按），改变两侧线条
  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
        />
    );
  }

  render() {
    return (
      <View style={styles.screen}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          />
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
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
});