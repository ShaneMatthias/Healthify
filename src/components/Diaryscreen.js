import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, Image } from 'react-native-elements'
import firebase from 'firebase'

export default class Diaryscreen extends Component {
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
        // console.log(usersFood.bacon.thumbnail)
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
            <ScrollView style={styles.containerStyle}>
                <View>
                    <Text>What did you eat today? </Text>

                    {Object.keys(usersFood).map(food => this.renderFood(food, usersFood))}
                    
                    <Button 
                        onPress={() => this.props.navigation.navigate('Foodsearch')}
                        title='Add Food'
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        padding: '4%'
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