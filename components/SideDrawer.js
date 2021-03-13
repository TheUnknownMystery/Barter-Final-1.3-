import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import firebase from 'firebase'
import db from '../config'
export default class SideDrawer extends React.Component {
 render() {
  return (

   <View style={{ flex: 1, backgroundColor: '#33867E' }}>
    <View style={{ flex: 0.8, marginTop: 300 }}>

     <DrawerItems {...this.props} />

     <View style={{ marginTop: 130, marginLeft: -180 }}>


      <TouchableOpacity style={{ alignSelf: 'center', fontWeight: '500%' }} onPress={() => {

       this.props.navigation.navigate("LoginScreen")
       firebase.auth().signOut()

      }} >

       <Text style={{ color: 'black', fontSize: 36, alignSelf: 'center', fontWeight: 'bold', color: 'white' }}>LogOut</Text>

      </TouchableOpacity>

     </View>
    </View>
   </View>

  )
 }
}