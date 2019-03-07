import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import EditInfo from './components/EditInfo'
import Homescreen from './components/Homescreen'
import Mainscreen from './components/Mainscreen'
import Diaryscreen from './components/Diaryscreen'
import Profilescreen from './components/Profilescreen'
import Foodsearch from './components/Foodsearch'
import Fooddetails from './components/Fooddetails'

const TabNavigator = createBottomTabNavigator({
    Mainscreen: { 
        screen: Mainscreen,
    },
    Diaryscreen: { screen: Diaryscreen },
    Profilescreen: { screen: Profilescreen }
}, {
    initialRouteName: 'Mainscreen',
    lazyload: true,
    animationEnabled: true,
    tabBarOptions: {
        showLabel: false,
        animationEnabled: true,
        activeTintColor: '#494949',
        inactiveTintColor: '#8e8e8e',
        labelStyle: {
            fontFamily: 'Futura'
        },
        style: {
            paddingTop: 20,
            backgroundColor: '#d1cac0'
        }
    }
})

const AppNavigator = createStackNavigator({
    Homescreen: { screen: Homescreen },
    EditInfo: { screen: EditInfo },
    Foodsearch: { screen: Foodsearch },
    Fooddetails: { screen: Fooddetails },
    TabNavigator: { screen: TabNavigator, navigationOptions: { header: null } }
})

export default createAppContainer(AppNavigator)