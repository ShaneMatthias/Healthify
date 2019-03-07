import React, { Component } from 'react'
import { View, Picker, Text, Slider, ActivityIndicator } from 'react-native'
import { Button } from 'react-native-elements'
import firebase from 'firebase'

export default class NewUserSignUp extends Component {
    static navigationOptions={
        title: 'Personal Info',
    }

    state = { gender: 'Male', age: 18, weight: 40, height: 60, activity: 1.2, goal: -299, loading: false, bmi: 0, caloricNeeds: 0  }

    setGender = (value) => { this.setState({ gender: value }) }
    setAge = (value) => { this.setState({ age: value }) }
    setWeight = (value) => { this.setState({ weight: value }) }
    setHeight = (value) => { this.setState({ height: value }) }
    setActivity = (value) => { this.setState({ activity: value }) }
    setGoal = (value) => { this.setState({ goal: value })}

    onButtonPress = () => {
        let { gender, age, weight, height, activity, goal, bmi, caloricNeeds } = this.state
        const currUser = firebase.auth().currentUser
        this.setState({ loading: true })

        if(gender === 'Male') {
            bmi = 66 + activity * ((height/2.54) * 12.9) + ((weight*2.2) * 6.3) - (age * 6.8)
        } else {
            bmi = 655 + activity * ((height/2.54) * 4.7) + ((weight*2.2) * 4.3) - (age * 4.7) * activity
        }

        caloricNeeds = bmi + goal - 1

        let protein = 0.8 * (2.2*weight)
        let fat = (caloricNeeds * 0.3) / 9
        let carbohydrate = (caloricNeeds - (protein*4) - (fat*9)) / 4
        let sugars = (caloricNeeds * 0.1) / 4
        let cholesterol = 300
        let potassium = 3500
        let sodium = 2300
        let fiber = 21

        if(gender === "Male") 
            fiber = 35
        





        firebase.database().ref(`/users/${currUser.uid}/info`)
            .update({ gender, age, weight, height, activity, goal, bmi, caloricNeeds, protein, fat, carbohydrate, sugars, fiber, cholesterol, sodium, potassium })
            .then(() => {
                this.setState({ loading:false })
                this.props.navigation.goBack()
        })
    }

    loading = () => {
        if(this.state.loading) 
            return (
                <View style={styles.loadingStyle}>
                    <ActivityIndicator />
                </View> 
            )

        return (
            <Button 
                title='Submit'
                onPress={this.onButtonPress}
            />
        )
    }

    render() {
        return(
            <View style={styles.containerStyle}> 

                <Text style={styles.labelStyle}>Gender:</Text>
                <Picker 
                    style={styles.pickerStyle} 
                    itemStyle={{height: 100}}
                    selectedValue={(this.state.gender) || 'Male'}
                    onValueChange={this.setGender}
                >
                    <Picker.Item label='Male' value='Male' />
                    <Picker.Item label='Female' value='Female' />
                </Picker>

                <Text style={styles.labelStyle}>Age:    {this.state.age}yrs</Text>
                <Slider 
                    style={styles.sliderStyle} 
                    step={1}
                    minimumValue={18}
                    maximumValue={100} 
                    value={this.state.age}
                    onValueChange={this.setAge}   
                />

                <Text style={styles.labelStyle}>Weight:    {Math.round(this.state.weight*10)/10}kg     {Math.round(this.state.weight*22)/10}lbs</Text>
                <Slider 
                    style={styles.sliderStyle} 
                    minimumValue={40}
                    maximumValue={150} 
                    value={this.state.weight}
                    onValueChange={this.setWeight}   
                />
                
                <Text style={styles.labelStyle}>Height:    {Math.round(this.state.height*10)/10}cm    {Math.round(this.state.height*0.328)/10}ft</Text>
                <Slider
                    style={styles.sliderStyle}
                    minimumValue={60}
                    maximumValue={250}
                    value={this.state.height}
                    onValueChange={this.setHeight}
                />

                <Text style={styles.labelStyle}>Activity level:</Text>
                <Picker 
                    style={styles.pickerStyle} 
                    itemStyle={{height: 100}}
                    selectedValue={(this.state.activity) || 1}
                    onValueChange={this.setActivity}
                >
                    <Picker.Item label='Sedentary' value={1.2} />
                    <Picker.Item label='Light' value={1.4} />
                    <Picker.Item label='Moderate' value={1.55} />
                    <Picker.Item label='Extreme' value={1.75} />
                </Picker>

                <Text style={styles.labelStyle}>Goal: </Text>
                <Picker 
                    style={styles.pickerStyle} 
                    itemStyle={{height: 100}}
                    selectedValue={(this.state.goal) || 1}
                    onValueChange={this.setGoal}
                >
                    <Picker.Item label='Lose weight' value={-299} />
                    <Picker.Item label='Maintain weight' value={1} />
                    <Picker.Item label='Gain weight' value={301} />
                </Picker>

                {this.loading()}
                
            </View>
        )
    }
}

const styles={
    containerStyle: {
        backgroundColor: 'white',
        padding: '4%',
    },

    pickerStyle: {
        paddingBottom: '1%'
    },

    sliderStyle: {
        paddingBottom: '20%'
    }

}