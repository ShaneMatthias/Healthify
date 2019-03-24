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
    
    state = { 
        haveData: false, 
        userInfo: { carbohydrate: 0, protein: 0, fat: 0, sugars: 0, fiber: 0, cholesterol: 0,sodium: 0,potassium: 0, age: 0, gender: '', height: 0, weight: 0, goal: ''} ,
        dailyNeeds:{ carbohydrate: 0, protein: 0, fat: 0, sugars: 0, fiber: 0, cholesterol: 0,sodium: 0,potassium: 0 },
        info: { age: 0, gender: '', height: 0, weight: 0, goal: ''  }
}
    
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

    displayDailyNeeds = (key, userInfo) => {
        let title = key.charAt(0).toUpperCase() + key.slice(1)
        let unit = 'g'

        if(title === 'Cholesterol' || title === 'Sodium' || title === 'Potassium')
            unit = 'mg'

        return (
            <View key={key} style={styles.infoContainer}>
                <View><Text style={[styles.textStyle, styles.infoTitle]}>{title} </Text></View>
                <View style={{alignItems: 'center'}}><Text style={[styles.textStyle, styles.infoText]}>{Math.floor(parseInt(userInfo[key]))}{unit}</Text></View>
            </View>
        )
    }

    displayInfo = (key, userInfo) => {
        let title = key.charAt(0).toUpperCase() + key.slice(1)
        let data = ''

        switch(key) {
            case 'age': 
                data = Math.floor(userInfo[key]) + 'yrs' 
                break
            case 'gender': 
                data = userInfo[key]
                break
            case 'height': 
                data = Math.floor(userInfo[key]) + 'cm'
                break
            case 'weight': 
                data = Math.floor(userInfo[key]) + 'kg'
                break
            case 'goal': 
                switch(userInfo[key]) {
                    case -299: 
                        data = 'Reduce'
                        break
                    case 1: 
                        data = 'Maintain'
                        break
                    case 301: 
                        data = 'Gain'
                        break
                }
        } 
        
        return (
            <View key={key} style={styles.infoContainer}>
                <View><Text style={[styles.textStyle, styles.infoTitle]}>{title} </Text></View>
                <View style={{alignItems: 'center'}}><Text style={[styles.textStyle, styles.infoText]}>{data}</Text></View>
            </View>
        )
    }

    render() {
        const { userInfo, dailyNeeds, info } = this.state
        return (
            <View style={styles.containerStyle}>

                <View style={styles.headerContainer}>
                    <TouchableHighlight underlayColor='transparent' onPress={() => this.props.navigation.navigate('EditInfo')} style={{padding: 4, width:30, height:30}}>
                        <Image
                            source={require('../../assets/edit.png')}
                            style={{width:30, height:30}} />
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor='transparent' onPress={this.handleLogOut} style={{padding: 4, width:30, height:30, marginLeft: 'auto', paddingRight: 40}}>
                        <Image
                            source={require('../../assets/logOut.png')}
                            style={{width:30, height:30}} />
                    </TouchableHighlight>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.textStyle}>
                        Your body burns <Text style={{fontSize: 20}}>{userInfo['bmi'] ? Math.floor(Math.round(userInfo['bmi']*10)/10) : 0}</Text> calories a day
                    </Text>
                    <Text style={styles.textStyle}>
                        You need to maintain <Text style={{fontSize: 20}}>{userInfo['caloricNeeds'] ? Math.floor(Math.round(userInfo['caloricNeeds']*10)/10) : 0}</Text> calories per day
                    </Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0, 2]}>
                    <View style={styles.stickyHeaderStyle}><Text style={[styles.textStyle, {fontSize: 18}]}>Daily needs:</Text></View>
                    <View style={styles.allInfoContainer}>
                        {Object.keys(dailyNeeds).map(key => this.displayDailyNeeds(key, userInfo))}
                    </View>

                    <View style={styles.stickyHeaderStyle}><Text style={[styles.textStyle, {fontSize: 18}]}>Personal Info:</Text></View>
                    <View style={styles.allInfoContainer}>
                        {Object.keys(info).map(key => this.displayInfo(key, userInfo))}
                    </View>
                </ScrollView>
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
        height: 30,
        flexDirection: 'row'
    },

    titleContainer: {
        width: Dimensions.get('window').width - 30,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },

    stickyHeaderStyle: {
        backgroundColor: '#f2eee8',
        width: Dimensions.get('window').width - 20,
        height: 30
    },

    allInfoContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginBottom: 20,
        marginTop: 10
    },

    infoContainer: {
        width: 140,
        height: 80,
        borderRadius: 2,
        backgroundColor: '#f9f6f2',
        margin: 16
    },

    infoTitle: {
        fontSize: 14,
        padding: 4
    },

    infoText: {
        fontSize: 18,
        paddingTop: 6
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
    }
})