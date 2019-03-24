import React, { Component } from 'react'
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import LoginComponent from './LoginComponent'
import firebase from 'firebase'
import config from '../config/config'

export default class Homescreen extends Component {
    static navigationOptions={
        header: null
    }

    componentWillMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp({
            apiKey: config.API_KEY,
            authDomain: "healthify-327e5.firebaseapp.com",
            databaseURL: "https://healthify-327e5.firebaseio.com",
            projectId: "healthify-327e5",
            storageBucket: "healthify-327e5.appspot.com",
            messagingSenderId: "46159617781"
            })
         }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.containerStyle}>
                    <Text style={styles.titleStyle}>Healthify</Text>  
                    <LoginComponent navigate={this.props.navigation}/>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#88BDBC',
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleStyle: {
        color: '#f2eee8',
        fontSize: 80,
        fontFamily: 'Futura',
        paddingBottom: 60
    },
})
