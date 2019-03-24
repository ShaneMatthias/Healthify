import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import ProgressBarAnimated from 'react-native-progress-bar-animated'
import firebase from 'firebase'

export default class Mainscreen extends Component {
    static navigationOptions = () => ({
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../assets/home.png')}
                style={{width: 25, height: 25, tintColor: tintColor}}
            />
        )
    })

    state = { 
        nutrients : { calories: 0, carbohydrate: 0, protein: 0, fat: 0, sugars: 0, fiber: 0, cholesterol: 0,sodium: 0,potassium: 0 },
        userInfo: { caloricNeeds: 0}
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

    displayNutrients = (key, nutrients, userInfo) => {
        let title = key.charAt(0).toUpperCase() + key.slice(1)
        let title2 = title.charAt(0).toLowerCase() + key.slice(1)
        let unit = 'g'
        let macroValue = (nutrients[key]/userInfo[title2])*100
        let color = '#88BDBC'

        if(nutrients[key] >= userInfo[title2]) {
            macroValue = 100
            color = '#b7594e'
        }

        if(title === 'Calories')
            return 

        if(title === 'Cholesterol' || title === 'Sodium' || title === 'Potassium')
            unit = 'mg'

        return (
            <View key={key} style={styles.macroContainer}>
                <View><Text style={[styles.textStyle, styles.macroTitle]}>{title} </Text></View>
                <View style={{alignItems: 'center'}}><Text style={[styles.textStyle, styles.macroNutrient]}>{parseInt(nutrients[key])}{unit}</Text></View>
                <View style={{paddingTop: 20}}>
                    <ProgressBarAnimated
                        borderRadius={2}
                        backgroundColor={color}
                        height={4}
                        width={140}
                        maxValue={100}
                        value={macroValue}
                    />
                </View>
            </View>
        )
    }

    renderBar = (nutrients, userInfo) => {
        let color = '#88BDBC'
        let macroValue = (nutrients['calories']/userInfo['caloricNeeds'])*100

        if(nutrients['calories'] >= userInfo['caloricNeeds']) {
            macroValue = 100
            color = '#b7594e'
        }
        return (
            <ProgressBarAnimated 
                borderRadius={2}
                backgroundColor={color}
                width={Dimensions.get('screen').width-15}
                maxValue={100}
                value={macroValue}
            />
        )
    }

    render() {
        const { nutrients, userInfo } = this.state

        return (
            <View style={styles.containerStyle}>

                <View style={styles.caloriesContainer}>
                    <View style={styles.calorieTextContainer}>
                        <Text style={[styles.textStyle, {fontSize: 14}]}>Current</Text>
                        <Text style={[styles.textStyle, {fontSize: 20}]}>{parseInt(nutrients['calories'])}</Text>
                    </View>
                
                    <View style={{justifyContent: 'flex-end', fontSize: 14}}><Text style={styles.textStyle}>cal</Text></View>

                    <View style={styles.calorieTextContainer}>
                        <Text style={[styles.textStyle, {fontSize: 14}]}>Goal</Text>
                        <Text style={[styles.textStyle, {fontSize: 20}]}>{parseInt(userInfo['caloricNeeds'])}</Text>
                    </View>
                </View>
                
                <View style={styles.barContainer}>{this.renderBar(nutrients, userInfo)}</View>

                <View style={styles.allMacrosContainer}>{Object.keys(nutrients).map(key => this.displayNutrients(key, nutrients, userInfo))}</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#f2eee8',
        paddingTop: 70,
        paddingLeft: 8,
        paddingRight: 8
    },

    caloriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 4
    },
    
    calorieTextContainer: {
        alignItems: 'center'
    }, 

    barContainer: {
        alignItems: 'center',
        paddingBottom: 20
    },

    allMacrosContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        paddingTop: 20
    },

    macroContainer: {
        width: 140,
        height: 80,
        borderRadius: 2,
        backgroundColor: '#f9f6f2',
        margin: 16
    },

    macroTitle: {
        fontSize: 14,
        padding: 4
    },

    macroNutrient: {
        fontSize: 18,
        paddingTop: 6
    },

    textStyle: {
        fontFamily: 'Futura',
        color: '#494949'
    }

})