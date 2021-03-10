import { createDrawerNavigator } from 'react-navigation-drawer'
import { BottomTab } from './AppNavigator'
import SideDrawer from './SideDrawer'
import login from '../Screens/Logins'
import Settings from '../Screens/Settings'
import MyBarter from '../Screens/MyBarter'

export const AppDrawer = createDrawerNavigator(
 {

  Home: {

   screen: BottomTab,

  },


  Settings: {

   screen: Settings

  },

  MyBarter: {

   screen: MyBarter

  }
 },
 {
  contentComponent: SideDrawer

 },
 {


  initialRouteName: 'Home'

 },

)

