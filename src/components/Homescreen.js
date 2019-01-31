import React, { Component } from 'react'
import { View, Text } from 'react-native'
import LoginComponent from './LoginComponent'
import SignUpComponent from './SignUpComponent'

export default class Homescreen extends Component {
    static navigationOptions={
        header: null
    }
    
    state = { login: true } 

    renderLogin = (bool) => { this.setState({ login: bool }) }

    renderContent = () => {
        if (this.state.login)
            return <LoginComponent renderLogin={this.renderLogin} />
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
