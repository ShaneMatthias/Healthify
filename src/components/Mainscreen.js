import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import firebase from 'firebase'
import { NavigationActions, StackActions } from 'react-navigation'

export default class Mainscreen extends Component {
    state = { 
        nutrients : { calories: 0, carbohydrate: 0, protein: 0, fat: 0, sugars: 0, fiber: 0, cholesterol: 0,sodium: 0,potassium: 0 }
    }

    componentDidMount() {
        const currUser = firebase.auth().currentUser

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'TabNavigator' })]
                });
            } 
        })

        firebase.database().ref(`/users/${currUser.uid}/foods`).on('value', (snapshot) => {
            nutrients = { calories: 0, carbohydrate: 0, protein: 0, fat: 0, sugars: 0, fiber: 0, cholesterol: 0,sodium: 0,potassium: 0 }

            snapshot.forEach((item) => {
                Object.keys(nutrients).map(key => { 
                    nutrients[key] += item.val()[key]
                })
            })

            this.setState({ nutrients })
        })
    }

    displayNutrients = (key, nutrients) => {
        let title = key.charAt(0).toUpperCase() + key.slice(1)
        return <Text key={key}>{title}: {Math.round(nutrients[key]*10)/10}g</Text>
    }

    render() {
        const { nutrients } = this.state

        return (
            <View styles={styles.containerStyle}>
                {Object.keys(nutrients).map(key => this.displayNutrients(key, nutrients))}
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