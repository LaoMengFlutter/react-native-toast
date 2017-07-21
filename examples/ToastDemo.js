/**
 * Created by 孟庆东 on 2017/7/19.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
} from 'react-native';
import {StackNavigator} from "react-navigation";
import {ToastContainer} from 'react-native-mobx-toast'
import Toast from 'react-native-mobx-toast'

export default class ToastDemo extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <Navigator/>
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,justifyContent:'center',alignItems:'center'}}>
                    <ToastContainer/>
                </View>
            </View>
        );
    }
}


class HomePage extends Component {
    render() {
        return (
            <View style={{flex: 1,justifyContent:'center'}}>
                <Button title='show toast' onPress={() => {
                    Toast.show('this is message');
                }}/>

                <Button title='show toast custom' onPress={() => {
                    Toast.show('this is message',
                        {
                            position: Toast.positions.TOP,
                            backgroundColor: 'red',
                            textColor: 'black',
                            isFillWidth: true,
                            height:48,
                            duration:Toast.durations.LONG,
                        });
                }}/>

            </View>
        );
    }
}

class MainPage extends Component {
    render() {
        return (
            <View>

            </View>
        );
    }
}


const Navigator = StackNavigator(
    {
        Home: {screen: HomePage,},
        Main: {screen: MainPage,}
    },
    {
        navigationOptions: {
            header: null,
        },
    });