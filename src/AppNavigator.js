import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import EditInfo from './components/EditInfo'
import Homescreen from './components/Homescreen'
import Mainscreen from './components/Mainscreen'
import Diaryscreen from './components/Diaryscreen'
import Profilescreen from './components/Profilescreen'

const TabNavigator = createBottomTabNavigator({
    Mainscreen: { screen: Mainscreen },
    Diaryscreen: { screen: Diaryscreen },
    Profilescreen: { screen: Profilescreen }
}, {
    initialRouteName: 'Mainscreen',
    lazyload: true,
    animationEnabled: true,
})

const AppNavigator = createStackNavigator({
    Homescreen: { screen: Homescreen },
    EditInfo: { screen: EditInfo },
    TabNavigator: { screen: TabNavigator }
})

export default createAppContainer(AppNavigator)