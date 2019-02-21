import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import firebase from 'firebase'

export default class Profilescreen extends Component {
    state = { haveData: false }
    
    render() {
        return (
            <View style={styles.containerStyle}>
                <Button 
                    title='Log Out'
                    onPress={() => firebase.auth().signOut()}
                />
                <Button 
                    title='Edit Info'
                    onPress={() => this.props.navigation.navigate('EditInfo')}
                />
                <Button 
                    title='Test'
                    onPress={() => 
                        fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
                            method: "POST",
                            headers: { "Content-Type": "application/json",
                                    "x-app-id": "0f038326", 
                                    "x-app-key": "f83c766a2027ebca8b253676e675b3d4", 
                                    // "id":"bd4aa66e-3764-421c-a60f-e3b769f970e0", 
                                    // "x-remote-user-id": "0" 
                            },
                            body:JSON.stringify({
                                'query': '1 banana'
                            })
                        }).then(res => res.json())
                        .then(body => console.log(body))
                        .catch(err => console.log(err))
                    }
                />
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