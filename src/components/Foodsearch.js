import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { ScrollView, TouchableOpacity, TouchableHighlight, Image, Dimensions } from 'react-native';
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
        .then(body => this.props.navigation.navigate('Fooddetails', { foodData: body, edit: false ,go_back_key: this.props.navigation.state.key }))
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

                <TouchableHighlight underlayColor='transparent' onPress={() => this.props.navigation.goBack()} style={styles.backButtonStyle}>
                    <Image
                        source={require('../../assets/back.png')}
                        style={{width:30, height:30}} />
                </TouchableHighlight>  

                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.inputStyle}
                        value={this.state.value}
                        placeholder="Type in food"
                        value={this.state.search}
                        onChangeText={search => this.onTextChange(search)}
                        />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle}>
                    {this.displaySearches()}
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4%',
        paddingTop: 50,
        backgroundColor: '#f2eee8',
    },

    backButtonStyle: {
        marginRight: 'auto',  
        width:20, 
        height:20
    },

    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#f9f6f2',
        marginTop: 30,
        borderRadius:30,
        borderBottomWidth: 1,
        width: Dimensions.get('window').width - 40,
        height:45,
        marginBottom:20,
    },

    inputStyle: {
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
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
        fontSize: 20,
        fontFamily: 'Futura',
        color: '#494949'
    },
})