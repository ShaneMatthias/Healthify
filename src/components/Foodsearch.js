import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Input, Icon } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native';
import config from '../config/config'

export default class Foodsearch extends Component {
    state = { search: '', foodArray: [] }

    onTextChange = (search) => {
        this.setState ({ search })

        if(search.trim() !== "") {
            fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${search}`, {
                method: "GET", headers: { "x-app-id": config.APP_ID, "x-app-key": config.APP_KEY }
                // "id":"bd4aa66e-3764-421c-a60f-e3b769f970e0", 
                // "x-remote-user-id": "0" 
            }).then(res => res.json())
            .then(body => this.setState({ foodArray: body.common })
            )
            .catch(err => console.log(err))
        }
    }

    handlePress = (data) => {
        fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
            method: "POST",
            headers: { "Content-Type": "application/json",
                    "x-app-id": config.APP_ID, 
                    "x-app-key": config.APP_KEY, 
                    // "id":"bd4aa66e-3764-421c-a60f-e3b769f970e0", 
                    // "x-remote-user-id": "0" 
            },
            body:JSON.stringify({
                'query': data.food_name
            })
        }).then(res => res.json())
        .then(body => this.props.navigation.navigate('Fooddetails', { foodData: body, go_back_key: this.props.navigation.state.key }))
        .catch(err => console.log(err))
    }

    displaySearches = () => {
        return this.state.foodArray.map((data) => {
            return (
                <View key={data.food_name}>
                    <TouchableOpacity 
                        style={styles.buttonStyle} 
                        onPress={() => this.handlePress(data)}
                    >
                        <Text style={styles.textStyle}>{data.food_name}</Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Input 
                    autoCorrect={false}
                    style={styles.inputStyle}
                    placeholder="Type in food"
                    value={this.state.search}
                    onChangeText={search => this.onTextChange(search)}
                    leftIcon={<Icon name='search' type='font-awesome' />}
                    leftIconContainerStyle={styles.iconStyle}
                />

                <ScrollView style={styles.scrollViewStyle}>
                    {this.displaySearches()}
                </ScrollView>

            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        justifyConent: 'center',
        alignItems: 'center',
        padding: '4%',
    },
    
    inputStyle: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: '25',
    },

    iconStyle: {
        paddingRight: '5%',
    },

    scrollViewStyle: {
        width: '100%'
    },

    buttonStyle: {
        alignItems: 'center',
        padding: 25
    },

    textStyle: {
        fontSize: 20
    },
}