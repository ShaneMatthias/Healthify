import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableHighlight, TextInput, StyleSheet, Image } from 'react-native'
import firebase from 'firebase'
import { NavigationActions, StackActions } from 'react-navigation'

export default class LoginComponent extends Component {
    static navigationOptions = {
        header: null
    }
    
    state = { email: '', password: '', loading: true, error: '', authFail: false, signUp: false }

    componentDidMount() {
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

    buttonLogin = () => {
        const { email, password } = this.state

        this.setState({ error: '', loading: true, authFail: false })

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess)
            .catch(this.onLoginFail)
    }

    buttonSignUp = () => {
        const { email, password } = this.state

        this.setState({ error: '', loading: true, authFail: false })

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess)
            .catch(error => {
                this.setState({
                    password: '',
                    loading: false,
                    authFail: true,
                    error: error.message
                })
            })
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

    renderButton = () => {
        if(this.state.signUp) {
            return (
                <View>
                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.buttonSignUp}>
                        <Text style={styles.loginText}>Sign up</Text>
                    </TouchableHighlight>
                    
                    <TouchableHighlight underlayColor='transparent' style={[styles.buttonContainer, styles.signUpButton]} onPress={() => this.setState({ signUp: false, error: '' })}>
                        <Text>Login</Text>
                    </TouchableHighlight>
                </View>
            )
        }

        return (
            <View>
                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.buttonLogin}>
                        <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>
                
                <TouchableHighlight underlayColor='transparent' style={[styles.buttonContainer, styles.signUpButton]} onPress={() => this.setState({ signUp: true, error: '' })}>
                    <Text>Register</Text>
                </TouchableHighlight>
            </View>
        )
    }

    renderComponent = () => {
        if(this.state.loading) 
            return (
                <View>
                    <ActivityIndicator size='large' color='#f2eee8' />
                </View> 
            )

        return (
            <View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}} />
                    <TextInput 
                        keyboardType="email-address"
                        style={styles.inputStyle}
                        placeholder="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        underlineColorAndroid='transparent'
                        />
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}} />
                    <TextInput 
                        style={styles.inputStyle}
                        placeholder="Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                    />
                </View>
                
                <View style={styles.buttonsContainer}>
                    {this.renderButton()}
                </View>

                <Text style={styles.errorStyle}>
                    {this.state.error}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.formContainer}>
                {this.renderComponent()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 260,
        width: 300,
        backgroundColor: '#88BDBC',
        paddingTop: 50
    },

    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },

    inputStyle: {
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },

    inputIcon: {
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
    },

    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
    },
    
    loginButton: {
        backgroundColor: "#254E58",
    },

    signUpButton: {
        backgroundColor: "#88BDBC",
    },

    loginText: {
        color: 'white',
        fontFamily: 'futura'
    },

    errorStyle: {
        fontSize: 12,
        alignSelf: 'center',
        color: 'red',
    }
})
