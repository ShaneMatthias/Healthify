import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { Button, Text } from 'react-native-elements'
import firebase from 'firebase'

export default class Profilescreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../assets/profile.png')}
                style={{width: 25, height: 25, tintColor: tintColor}}
            />
        )
    })
    
    state = { haveData: false, userInfo: {} }
    
    componentDidMount() {    
        const currUser = firebase.auth().currentUser
        firebase.database().ref(`/users/${currUser.uid}/info`).on('value', (snapshot) => {
            if(snapshot.val() != null)
                this.setState({ userInfo: snapshot.val() })
        })
    }

    handleLogOut = () => {
        firebase.auth().signOut().then(() => {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Homescreen'})]
            });
            this.props.navigation.dispatch(resetAction);
        })
    }

    render() {
        const { userInfo } = this.state
        return (
            <View style={styles.containerStyle}>
                <Button 
                    title='Log Out'
                    onPress={this.handleLogOut}
                />
                <Button 
                    title='Edit Info'
                    onPress={() => this.props.navigation.navigate('EditInfo')}
                />

                <Text>You burn {Math.round(userInfo['bmi']*10)/10} calories a day</Text>
                <Text>You need to stay at {Math.round(userInfo['caloricNeeds']*10)/10} calories to reach your goal</Text>
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
    }
}