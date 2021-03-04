import * as React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Home from '../Screens/Home'
import Exchange from '../Screens/Exchange'
import { StackNavigator } from './StackNavigator'
export const BottomTab = createBottomTabNavigator(
 {

  HomePage: {

   screen: StackNavigator,

   navigationOptions: {
    tabBarIcon: <Image

     style={{ width: 20, height: 20 }}
     source={require('../assets/Home.png')}

    />,

    tabBarLabel: 'HomePage'
   }
  },
  ExchangePage: {

   screen: Exchange,

   navigationOptions: {
    tabBarIcon: <Image

     style={{ width: 20, height: 20 }}
     source={require('../assets/E.png')}

    />,
    tabBarLabel: 'ExchangePage'
   }
  },
 },
 {

 })