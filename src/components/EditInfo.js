import React, { Component } from 'react'
import { View, Picker, Text, Slider } from 'react-native'
import { Button } from 'react-native-elements'
import firebase from 'firebase'

export default class NewUserSignUp extends Component {
    static navigationOptions={
        title: 'Personal Info',
    }

    state = { gender: '', age: 18, weight: 40, height: 60, activity: 1, goal: 1 }

    setGender = (value) => { this.setState({ gender: value }) }
    setAge = (value) => { this.setState({ age: value }) }
    setWeight = (value) => { this.setState({ weight: value }) }
    setHeight = (value) => { this.setState({ height: value }) }
    setActivity = (value) => { this.setState({ activity: value }) }
    setGoal = (value) => { this.setState({ goal: value })}

    onButtonPress = () => {
        const { gender, age, weight, height, activity, goal } = this.state
        const currUser = firebase.auth().currentUser

        firebase.database().ref(`/users/${currUser.uid}/info`)
            .push({ gender, age, weight, height, activity, goal })
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
                    <Picker.Item label='Sedentary' value={1} />
                    <Picker.Item label='Light' value={2} />
                    <Picker.Item label='Moderate' value={3} />
                    <Picker.Item label='Extreme' value={4} />
                </Picker>

                <Text style={styles.labelStyle}>Goal: </Text>
                <Picker 
                    style={styles.pickerStyle} 
                    itemStyle={{height: 100}}
                    selectedValue={(this.state.goal) || 1}
                    onValueChange={this.setGoal}
                >
                    <Picker.Item label='Lose weight' value={1} />
                    <Picker.Item label='Maintain weight' value={2} />
                    <Picker.Item label='Gain weight' value={3} />
                </Picker>

                <Button 
                    title='Submit'
                    onPress={this.onButtonPress}
                />

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