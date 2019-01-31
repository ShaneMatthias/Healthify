import { createStackNavigator, createAppContainer } from 'react-navigation'
import NewUserSignUp from './components/NewUserSignUp'
import Homescreen from './components/Homescreen'

const AppNavigator = createStackNavigator({
    Homescreen: { screen: Homescreen },
    NewUserSignUp: { screen: NewUserSignUp },
})

export default createAppContainer(AppNavigator)