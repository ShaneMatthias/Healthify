import React, { Component } from 'react'
import { ScrollView, View, TouchableHighlight } from 'react-native'
import { Button, Text, Image } from 'react-native-elements'
import firebase from 'firebase'

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

    renderFood = (data, usersFood) => {
        let title = data.charAt(0).toUpperCase() + data.slice(1)
        return (
            <View key={data}>
                <View style={styles.thumbnailContainerStyle}>
                    <Image 
                        style={styles.thumbnailStyle}
                        source={{ uri: usersFood[data].thumbnail }} />
                </View>
                <Text>{title}</Text>
            </View>
        )
    }

    render() {
        const { usersFood } = this.state
        return (
        <View style={styles.containerStyle}>
            <ScrollView>
                <View style={styles.titleContainer}><Text style={[styles.textStyle, styles.titleText]}>Food intake</Text></View>            
                
                <View>{Object.keys(usersFood).map(food => this.renderFood(food, usersFood))}</View>
            </ScrollView>

            <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Foodsearch')}>
                <Text style={styles.textStyle}>Add food</Text>
            </TouchableHighlight>
        </View>
        )
    }
}

const styles = {
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
        paddingBottom: 10
    },

    titleText: {
        fontSize: 20,
        color: "#494949"
    },

    buttonContainer: {
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:150,
        borderRadius:30,
        backgroundColor: "#254E58"
    },

    textStyle: {
        color: 'white',
        fontFamily: 'futura'
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