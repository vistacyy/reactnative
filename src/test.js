import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Main from 'Lifecycle';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: '',
        }
    }



    render() {

        let a='string'.char

        return (
            <View>
                <Text>good start</Text>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    width: 19,

});