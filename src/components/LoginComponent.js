import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements' 
import firebase from 'firebase'
import { NavigationActions, StackActions } from 'react-navigation'

export default class LoginComponent extends Component {
    static navigationOptions = {
        header: null
    }
    
    state = { email: '', password: '', loading: true, error: '', authFail: false }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'TabNavigator' })]
                });
                this.props.navigate.dispatch(resetAction)
            } else {
                this.setState({ loading: false })
            }
        });
      }

    onButtonPress = () => {
        const { email, password } = this.state

        this.setState({ error: '', loading: true, authFail: false })

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess)
            .catch(this.onLoginFail)
    }

    onLoginFail = () => {
        this.setState({
            email: '',
            password: '',
            loading: false,
            authFail: true,
            error: 'Authentication Failed'
        })
    }

    onLoginSuccess = () => {
        this.setState({
            email: '',
            password: '',
            loading: false,
            authFail: false,
            error: ''
        })
    }

    loading = () => {
        if(this.state.loading) 
            return (
                <View style={styles.loadingStyle}>
                    <ActivityIndicator />
                </View> 
            )

        return (
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.buttonStyle}
                    title='Log in'
                    icon={<Icon name='sign-in' type='font-awesome' size={28} />}
                    titleStyle={styles.buttonTitleStyle}
                    onPress={this.onButtonPress}
                />
                <Button 
                    style={styles.buttonStyle}
                    title='Sign up'
                    icon={<Icon name='user-plus' type='font-awesome' />}
                    titleStyle={styles.buttonTitleStyle}
                    onPress={() => this.props.renderLogin(false)}
                />
            </View>
        )
    }

    render() {
        return (
            <View pointerEvents={this.state.loading ? 'none' : 'auto'} style={styles.formContainerStyle}>
                <Input 
                    autoCorrect={false}
                    style={styles.inputStyle}
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    leftIcon={<Icon name='envelope' type='font-awesome' />}
                    leftIconContainerStyle={styles.iconStyle}
                />
                <Input 
                    autoCorrect={false}
                    style={styles.inputStyle}
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    leftIcon={<Icon name='lock' type='font-awesome' size={34} />}   
                    leftIconContainerStyle={styles.iconStyle} 
                    secureTextEntry={true}
                />

                {this.loading()}

                <Text style={styles.errorStyle}>
                    {this.state.error}
                </Text>
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
    },

    loadingStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '3%',
    },

    errorStyle: {
        fontSize: 12,
        alignSelf: 'center',
        color: 'red',
    }
}
