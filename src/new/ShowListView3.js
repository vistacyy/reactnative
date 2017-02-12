import React, { Component } from 'react';
import {
  Image,
  LayoutAnimation,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
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


let NUM_SECTIONS = 9;
let NUM_ROWS_PER_SECTION = 10;


class Thumb extends Component {

  constructor(props) {
    super(props);
    this.state = {
      thumbIndex: this._getThumbIdx(),
      dir: 'row',
    };
  }

  _getThumbIdx = () => {
    return Math.floor(Math.random() * THUMB_URLS.length);
  };

  _onPressThumb = () => {
    let config = layoutAnimationConfigs[this.state.thumbIndex % layoutAnimationConfigs.length];
    LayoutAnimation.configureNext(config);
    this.setState({
      thumbIndex: this._getThumbIdx(),
      dir: this.state.dir === 'row' ? 'column' : 'row',
    });
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this._onPressThumb}
        style={[styles.buttonContents, { flexDirection: this.state.dir }]}>
        <Image style={styles.img} source={THUMB_URLS[this.state.thumbIndex]} />
        <Image style={styles.img} source={THUMB_URLS[this.state.thumbIndex]} />
        <Image style={styles.img} source={THUMB_URLS[this.state.thumbIndex]} />
        {this.state.dir === 'column' ?
          <Text>
            Oooo, look at this new text!  So awesome it may just be crazy.
            Let me keep typing here so it wraps at least one line.
          </Text> :
          <Text />
        }
      </TouchableOpacity>
    );
  }
}

export default class ShowListView3 extends Component {
  constructor(props) {
    super(props);
    // DataSource构造函数
    let getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID][rowID];
    };
    let getSectionData = (dataBlob, sectionID) => {
      return sectionID;
    };
    let dataSource = new ListView.DataSource({
      getRowData: getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    let dataBlob = {};
    let sectionIDs = [];
    let rowIDs = [];
    for (let ii = 0; ii < NUM_SECTIONS; ii++) {
      let sectionName = 'Section ' + ii;
      // sectionIDs.push(sectionName);
      // dataBlob[sectionName] = sectionName;
      rowIDs[ii] = [];

      for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
        let rowName = 'S' + ii + ', R' + jj;
        rowIDs[ii].push(rowName);
        // dataBlob[rowName] = rowName;
      }
      dataBlob[sectionName] = rowIDs[ii];

    }
    // console.info(dataBlob);
    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(dataBlob),
      headerPressCount: 0,
    };
  }

  renderRow = (rowData, sectionID, rowID) => {
    // console.info('rowData',rowData, sectionID, rowID);
    return (<Thumb text={rowData} />);
  };

  renderSectionHeader = (sectionData, sectionID) => {
    // console.info('sectionData',sectionData, sectionID);
    return (
      <View style={styles.section}>
        <Text style={styles.text}>
          {sectionData}
        </Text>
      </View>
    );
  };

  _onPressHeader = () => {
    let config = layoutAnimationConfigs[Math.floor(this.state.headerPressCount / 2) % layoutAnimationConfigs.length];
    LayoutAnimation.configureNext(config);
    this.setState({ headerPressCount: this.state.headerPressCount + 1 });
  };

  renderHeader = () => {
    let headerLikeText = !!(this.state.headerPressCount % 2) &&
      <View><Text style={styles.text}>1 Like</Text></View> ;
    return (
      <TouchableOpacity onPress={this._onPressHeader} style={styles.header}>
        {headerLikeText}
        <View>
          <Text style={styles.text}>
            Table Header (click me)
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    return (
      <View style={styles.header}>
        <Text onPress={() => console.log('Footer!')} style={styles.text}>
          Table Footer
        </Text>
      </View>
    );
  };


  render() {
    return (
      <View style={styles.screen}>
        <ListView
          style={styles.listview}
          dataSource={this.state.dataSource}
          onChangeVisibleRows={(visibleRows, changedRows) => console.log({ visibleRows, changedRows })}
          renderHeader={this.renderHeader}
          renderFooter={this.renderFooter}
          renderSectionHeader={this.renderSectionHeader}
          renderRow={this.renderRow}
          initialListSize={10}
          pageSize={4}
          scrollRenderAheadDistance={500}
          />
        <Back navigator={this.props.navigator} />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listview: {
    backgroundColor: '#B0C4DE',
  },
  header: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B5998',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    paddingHorizontal: 8,
  },
  rowText: {
    color: '#888888',
  },
  thumbText: {
    fontSize: 20,
    color: '#888888',
  },
  buttonContents: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 3,
    padding: 5,
    backgroundColor: '#EAEAEA',
    borderRadius: 3,
    paddingVertical: 10,
  },
  img: {
    width: 64,
    height: 64,
    marginHorizontal: 10,
    backgroundColor: 'transparent',
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 6,
    backgroundColor: '#5890ff',
  },
});

let animations = {
  layout: {
    spring: {
      duration: 750,
      create: {
        duration: 300,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.4,
      },
    },
    easeInEaseOut: {
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        delay: 100,
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    },
  },
};

let layoutAnimationConfigs = [
  animations.layout.spring,
  animations.layout.easeInEaseOut,
];