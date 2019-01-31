import React, { Component } from 'react'
import { View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements' 

export default class LoginComponent extends Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={styles.formContainerStyle}>
                <Input 
                    autoCorrect={false}
                    style={styles.inputStyle}
                    placeholder="Email"
                    leftIcon={<Icon name='envelope' type='font-awesome' />}
                    leftIconContainerStyle={styles.iconStyle}
                />
                <Input 
                    autoCorrect={false}
                    style={styles.inputStyle}
                    placeholder="Password"
                    leftIcon={<Icon name='lock' type='font-awesome' size={34} />}   
                    leftIconContainerStyle={styles.iconStyle} 
                />

                <View style={styles.buttonContainer}>
                    <Button
                        style={styles.buttonStyle}
                        title='Log in'
                        icon={<Icon name='sign-in' type='font-awesome' size={28} />}
                        titleStyle={styles.buttonTitleStyle}
                    />
                    <Button 
                        style={styles.buttonStyle}
                        title='Sign up'
                        icon={<Icon name='user-plus' type='font-awesome' />}
                        titleStyle={styles.buttonTitleStyle}
                        onPress={() => this.props.renderLogin(false)}
                    />
                </View>
            </View>
        )
    }
}

const styles = {
    formContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        width: 300,
        backgroundColor: '#e5fcff',
    },

    inputStyle: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: '25',
    },

    iconStyle: {
        paddingRight: '5%',
    },

    buttonContainer: {
        flexDirection: 'row'
    },

    buttonStyle: {
        paddingTop: '5%',
        paddingLeft: '7%',
        paddingRight: '7%'
    },

    buttonTitleStyle: {
        paddingLeft: '5%'
    }
}
