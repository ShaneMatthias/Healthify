import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableHighlight, TextInput, Dimensions, StyleSheet } from 'react-native'
import { Image } from 'react-native-elements'
import firebase from 'firebase'

export default class Fooddetails extends Component {
    state = { 
        nutrients: { nf_calories: 0, nf_total_carbohydrate: 0, nf_protein: 0, nf_total_fat: 0, nf_sugars: 0, nf_dietary_fiber: 0, nf_cholesterol: 0,nf_sodium: 0, nf_potassium: 0 }, 
        val: 1, 
        loading: false 
    }

    handlePress = (val, foodData, nutrients) => {
        const currUser = firebase.auth().currentUser
        this.setState({ loading: true })
        let macros = {}

        Object.keys(nutrients).map(key => {
            let temp = key.split("_")
            let title = temp.slice(temp.length-1)
            macros[title] = foodData[key]*val
        })

        macros["thumbnail"] = foodData.photo.thumb
        
        firebase.database().ref(`/users/${currUser.uid}/foods/${foodData.food_name}`)
            .update(macros)
            .then(() => {
                this.setState({ loading:false })
                this.props.navigation.goBack(this.props.navigation.state.params.go_back_key)
        })
    }

    renderButton = (val, foodData, nutrients) => {
        if(this.state.loading) 
            return (
                <View style={{height:40}}>
                    <ActivityIndicator />
                </View> 
            )

        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: Dimensions.get('window').width-10}}>
                <TouchableHighlight style={[styles.buttonContainer, {backgroundColor:'#aa3f3f'}]} onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.buttonTextStyle}>Cancel</Text>
                </TouchableHighlight> 

                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.handlePress(val, foodData, nutrients)}>
                    <Text style={styles.buttonTextStyle}>Add</Text>
                </TouchableHighlight> 
            </View>
        )
    }

    displayNutrients = (key, foodData, val) => {
        let temp = key.split("_")
        let title = temp.slice(temp.length-1)
        return (
            <View key={key} style={styles.macroContainer}>
                
                <View><Text style={[styles.textStyle, styles.macroTitle]}>{title}</Text></View>
            
                <View style={{alignItems: 'center'}}>
                    <Text style={[styles.textStyle, styles.macroNutrient]}>{Math.round(foodData[key]*val*10)/10}</Text>
                </View>
            </View>
            
        )
    }

    render() {
        const foodData = this.props.navigation.getParam('foodData').foods[0]
        const { val, nutrients } = this.state

        return (
            <View style={styles.containerStyle}>
                {/* <TextInput 
                    keyboardType='numeric'
                    placeholder='Number of servings'
                    style={styles.inputStyle}
                    onChangeText={val => this.setState({ val })}
                /> */}

                <View style={styles.thumbnailContainerStyle}>
                    <Image 
                        style={styles.thumbnailStyle}
                        source={{ uri: foodData.photo.thumb }} />
                </View>

                <View style={styles.allMacrosContainer}>{Object.keys(nutrients).map(key => this.displayNutrients(key, foodData, val))}</View>

                <View>{this.renderButton(val, foodData, nutrients)}</View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4%',
        paddingTop: 60,
        backgroundColor: '#f2eee8',
    },

    inputStyle: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: '25',
        width: '20'
    },

    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5
    },

    thumbnailStyle: {
        height: 80,
        width: 80,
        borderRadius: 5
    },

    textStyle: {
        fontFamily: 'Futura',
        color: '#494949'
    },

    inputStyle: {
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
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

    buttonContainer: {
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:80,
        borderRadius:30,
        backgroundColor: "#254E58"
    },

    buttonTextStyle: {
        color: 'white',
        fontFamily: 'futura'
    },

})