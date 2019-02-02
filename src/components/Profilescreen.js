import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import firebase from 'firebase'

export default class Profilescreen extends Component {
    render() {
        return (
            <View styles={styles.containerStyle}>
                <Button 
                    title='Log Out'
                    onPress={() => firebase.auth().signOut()}
                />
                <Button 
                    title='Edit Info'
                    onPress={() => this.props.navigation.navigate('EditInfo')}
                />
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        justifyConent: 'center',
        alignItems: 'center',
    }
}