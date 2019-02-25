import React, { Component } from 'react'
import { View, Text } from 'react-native'
import firebase from 'firebase'
import { NavigationActions, StackActions } from 'react-navigation'

export default class Mainscreen extends Component {
    state = { 
        nutrients : { calories: 0, carbohydrate: 0, protein: 0, fat: 0, sugars: 0, fiber: 0, cholesterol: 0,sodium: 0,potassium: 0 },
        userInfo: {}
    }

    componentDidMount() {
        const currUser = firebase.auth().currentUser

        firebase.database().ref(`/users/${currUser.uid}/info`).on('value', (snapshot) => {
            if(snapshot.val() != null) 
                this.setState({ userInfo: snapshot.val() })
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
        const { nutrients, userInfo } = this.state

        return (
            <View styles={styles.containerStyle}>
                <Text>Your are at {Math.round(nutrients['calories']*10)/10}calories, you need {Math.round(userInfo['caloricNeeds']*10)/10}calories.</Text>
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