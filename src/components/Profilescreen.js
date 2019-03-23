import React, { Component } from 'react'
import { View, Image, StyleSheet, Dimensions, TouchableHighlight, Alert, ScrollView } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { Text } from 'react-native-elements'
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
        Alert.alert(
            'Log Out',
            'Are you sure?',
            [
                {text: 'Ok', onPress: () => {
                    firebase.auth().signOut().then(() => {
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({routeName: 'Homescreen'})]
                        });
                        this.props.navigation.dispatch(resetAction);
                    })
                }},
                {text: 'Cancel', style: 'cancel'}
            ],
        );
    }

    render() {
        const { userInfo } = this.state
        return (
            <View style={styles.containerStyle}>

                <View style={styles.headerContainer}>
                    <TouchableHighlight underlayColor='transparent' onPress={this.handleLogOut} style={{padding: 4, width:30, height:30, marginLeft: 'auto', paddingRight: 40}}>
                        <Image
                            source={require('../../assets/logOut.png')}
                            style={{width:30, height:30}} />
                    </TouchableHighlight>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.textStyle}>
                        Your body burns <Text style={{fontSize: 20}}>{Math.floor(Math.round(userInfo['bmi']*10)/10)}</Text> calories a day
                    </Text>
                    <Text style={styles.textStyle}>
                        You need to maintain <Text style={{fontSize: 20}}>{Math.floor(Math.round(userInfo['caloricNeeds']*10)/10)}</Text> calories per day
                    </Text>
                </View>

                <ScrollView>
                    <Text style={[styles.textStyle, {fontSize: 16}]}>Dialy needs:</Text>
                    <View style={styles.allInfoContainer}>
                        
                    </View>

                    <Text style={styles.textStyle}>Personal Info:</Text>
                    <View style={styles.allInfoContainer}>

                    </View>
                </ScrollView>

                

                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('EditInfo')}>
                    <Text style={styles.buttonTextStyle}>Edit Info</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    containerStyle: {
        flex: 1,
        paddingTop: 50,
        padding: '4%',
        backgroundColor: '#f2eee8',
    },

    headerContainer: {
        width: Dimensions.get('window').width - 20,
        height: 40
    },

    titleContainer: {
        width: Dimensions.get('window').width - 30,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 6,
        marginBottom: 10
    },

    allInfoContainer: {

    },

    infoContainer: {

    },

    buttonContainer: {
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
        marginTop:10,
        width:150,
        borderRadius:30,
        backgroundColor: "#254E58"
    },

    buttonTextStyle: {
        color: 'white',
        fontFamily: 'futura'
    },

    textStyle: {
        fontFamily: 'Futura',
        color: '#494949',
        fontSize: 16
    },



})