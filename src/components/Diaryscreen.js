import React, { Component } from 'react'
import { ScrollView, View, TouchableHighlight, StyleSheet } from 'react-native'
import { Text, Image } from 'react-native-elements'
import firebase from 'firebase'
import Dimensions from 'Dimensions'
import config from '../config/config'

export default class Diaryscreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: 'Diary',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../assets/diary.png')}
                style={{width: 25, height: 25, tintColor: tintColor}}
            />
        )
    })

    state = { usersFood: {} }

    componentDidMount() {    
        const currUser = firebase.auth().currentUser
        firebase.database().ref(`/users/${currUser.uid}/foods`).on('value', (snapshot) => {
            if(snapshot.val() != null)
                this.setState({ usersFood: snapshot.val() })
        })
    }

    deleteData = (foodItem) => {
        const currUser = firebase.auth().currentUser
        firebase.database().ref(`/users/${currUser.uid}/foods/${foodItem}`).remove()
    }

    editDetails = (data) => {
        fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
            method: "POST",
            headers: { "Content-Type": "application/json",
                    "x-app-id": config.APP_ID, 
                    "x-app-key": config.APP_KEY, 
                    // "id":"bd4aa66e-3764-421c-a60f-e3b769f970e0", 
                    // "x-remote-user-id": "0" 
            },
            body:JSON.stringify({
                'query': data
            })
        }).then(res => res.json())
        .then(body => this.props.navigation.navigate('Fooddetails', { foodData: body, edit: true }))
        .catch(err => console.log(err))
    }

    renderFood = (data, usersFood) => {
        let title = data.charAt(0).toUpperCase() + data.slice(1)
        return (
            <View style={styles.listItemStyle} key={data}>
                <View style={styles.thumbnailContainerStyle}>
                    <Image 
                        style={styles.thumbnailStyle}
                        source={{ uri: usersFood[data].thumbnail }} />
                </View>
                
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.titleTextStyle}>{title}</Text>
                    <TouchableHighlight underlayColor='transparent' onPress={() => this.editDetails(data)} style={{marginTop: 'auto', paddingLeft: 4, width:15, height:15}}>
                        <Image
                            source={require('../../assets/view.png')}
                            style={{width:15, height:15}} />
                    </TouchableHighlight>    
                </View>

                <View style={styles.iconsContainer}>
                    <TouchableHighlight underlayColor='transparent' onPress={() => this.deleteData(data)} style={{padding: 4, width:30, height:30, marginLeft: 'auto'}}>
                        <Image
                            source={require('../../assets/delete.png')}
                            style={{width:30, height:30}} />
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

    render() {
        const { usersFood } = this.state

        return (
        <View style={styles.containerStyle}>
            <View style={styles.titleContainer}><Text style={[styles.textStyle, styles.titleText]}>Food intake</Text></View>            
            
            <ScrollView showsVerticalScrollIndicator={false}>        
                <View>{Object.keys(usersFood).map(food => this.renderFood(food, usersFood))}</View>
            </ScrollView>

            <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Foodsearch')}>
                <Text style={styles.buttonTextStyle}>Add food</Text>
            </TouchableHighlight>
        </View>
        )
    }
}

const styles = StyleSheet.create ({
    containerStyle: {
        flex: 1,
        backgroundColor: '#f2eee8',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60,
        paddingLeft: 8,
        paddingRight: 8
    },

    titleContainer: {
        paddingBottom: 14
    },

    titleText: {
        fontFamily: 'Futura',
        fontSize: 20,
        color: "#494949"
    },

    buttonContainer: {
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
        marginTop:10,
        width: Dimensions.get('window').width - 50,
        borderRadius:30,
        backgroundColor: "#254E58"
    },

    buttonTextStyle: {
        color: 'white',
        fontFamily: 'futura'
    },

    listItemStyle: {
        flexDirection: 'row',
        width: Dimensions.get('window').width - 20,
        height: 100,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 6,
        paddingBottom: 6,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#f9f6f2'
    },

    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },

    thumbnailStyle: {
        height: 80,
        width: 80,
        borderRadius: 10
    },

    titleTextStyle: {
        fontFamily: 'Futura',
        color: '#494949',
        fontSize: 18,
    },

    iconsContainer: {
        height: 100,
        width: 80
    }
})