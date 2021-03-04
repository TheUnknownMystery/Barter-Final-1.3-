import { createStackNavigator } from 'react-navigation-stack'
import Home from '../Screens/Home'
import Trade from '../Screens/Trade'

export const StackNavigator = createStackNavigator({

 Home: {

  screen: Home,

  navigationOptions: {



  },
 },

 Trade: {

  screen: Trade

 },
},
 {

  initialRouteName: 'Home'

 },

)