import React, { Component } from 'react'
import { View, Text } from 'react-native'
import LoginComponent from './LoginComponent'
import SignUpComponent from './SignUpComponent'
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
    
    state = { login: true } 

    renderLogin = (bool) => { this.setState({ login: bool }) }

    renderContent = () => {
        if (this.state.login)
            return <LoginComponent renderLogin={this.renderLogin} navigate={this.props.navigation}/>
        return <SignUpComponent renderLogin={this.renderLogin} navigate={this.props.navigation} />
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Text style={styles.titleStyle}>Healthify</Text>  
                {this.renderContent()}
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#51b9c6',
        justifyConent: 'center',
        alignItems: 'center',
        paddingTop: 200,
    },

    titleStyle: {
        fontSize: 70,
        fontFamily: 'Cochin',
        paddingBottom: 180
    },
}
