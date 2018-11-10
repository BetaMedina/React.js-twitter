import {createStackNavigator} from 'react-navigation'


import Login from './pages/login'
import timeLine from './pages/timeLine'
import newTweet from './pages/new'

const Routes = createStackNavigator ({
    Login,
    timeLine,
    newTweet
})
export default Routes