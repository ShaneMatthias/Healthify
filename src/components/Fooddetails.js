import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
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
                <View style={styles.loadingStyle}>
                    <ActivityIndicator />
                </View> 
            )

        return (
            <Button 
                title='Add'
                onPress={() => this.handlePress(val, foodData, nutrients)}
            />
        )
    }

    displayNutrients = (key, foodData, val) => {
        let temp = key.split("_")
        let title = temp.slice(temp.length-1)
        return <Text key={key}>{title}:{Math.round(foodData[key]*val*10)/10}</Text>
    }

    render() {
        const foodData = this.props.navigation.getParam('foodData').foods[0]
        const { val, nutrients } = this.state

        return (
            <View style={styles.containerStyle}>
                <Input 
                    label='Number of servings:'
                    keyboardType='numeric'
                    style={styles.inputStyle}
                    onChangeText={val => this.setState({ val })}
                />

                <View style={styles.thumbnailContainerStyle}>
                    <Image 
                        style={styles.thumbnailStyle}
                        source={{ uri: foodData.photo.thumb }} />
                </View>

                {Object.keys(nutrients).map(key => this.displayNutrients(key, foodData, val))}

                {this.renderButton(val, foodData, nutrients)}

            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        justifyConent: 'center',
        alignItems: 'center',
        padding: '4%'
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
        marginRight: 10
    },

    thumbnailStyle: {
        height: 50,
        width: 50
    },

}