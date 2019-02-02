import React, { Component } from 'react'
import { View, Text } from 'react-native'
import firebase from 'firebase'
import { NavigationActions, StackActions } from 'react-navigation'

export default class Mainscreen extends Component {

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'TabNavigator' })]
            });
          } 
        });
      }

    render() {
        return (
            <View styles={styles.containerStyle}>
                <Text>TESTING TESTING 1..2..3..</Text>
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