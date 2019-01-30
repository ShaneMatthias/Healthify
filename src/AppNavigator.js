import { createStackNavigator, createAppContainer } from 'react-navigation'
import LoginComponent from './components/LoginComponent'
import SignUpComponent from './components/SignUpComponent'

const AppNavigator = createStackNavigator({
    LoginComponent: { screen: LoginComponent },
    SignUpComponent: { screen: SignUpComponent },
})

export default createAppContainer(AppNavigator)