import { setStatusBarStyle } from 'expo-status-bar'
import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Header } from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'
import { DatePickerIOSBase } from 'react-native'

export default class Exchange extends React.Component {

  AddItem = async (ItemName, ItemDescription) => {

    var RandomID = this.createUniqueID();
    var User_ID = this.state.UserID;

    if (ItemName && ItemDescription) {


      db.collection("AddedItem").add({

        'Item_Name': this.state.ItemName,
        'Item_Definition': this.state.ItemDescription,
        'ItemId': RandomID,
        'UserID': User_ID

      })
    }
  }

  createUniqueID = () => {

    return Math.random().toString(36).substring(7);

  }

  constructor() {
    super()

    this.state = {

      ItemName: '',
      ItemDescription: '',
      UserID: firebase.auth().currentUser.email
    }
  }
  render() {

    return (

      <View style={{ alignSelf: 'center', marginTop: 80, borderRadius: 4, borerRadius: 0.3, paddingBottom: 60, paddingTop: 50, paddingLeft: 50, paddingRight: 50, backgroundColor: 'lightgrey' }}>

        <View>

          <Text style={{ alignItems: 'center', fontWeight: 'bold', fontSize: 40, alignSelf: 'center' }}>Add Item To Donate</Text>

        </View>

        <View>

          <TextInput

            style={styles.TextInputStyle}
            placeholder="Item Name"
            maxLength={20}

            onChangeText={(text) => {

              this.setState({ ItemName: text })

            }}
          />

        </View>

        <View>

          <TextInput

            style={styles.TextInputStyleDescription}
            placeholder="Description Of the Item"
            maxLength={110}

            onChangeText={(text) => {

              this.setState({ ItemDescription: text })

            }}
          />

        </View>

        <View>

          <TouchableOpacity style={styles.SubmitButton} onPress={() => {

            this.AddItem(this.state.ItemName, this.state.ItemDescription)
            alert("Donation Submitted.Thank you for Donating")

          }}>

            <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>Submit</Text>

          </TouchableOpacity>

        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({

  HomePage: {

    alignSelf: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    fontSize: 60

  },

  TextInputStyle: {

    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 3.0,
    borderRadius: 4,
    borderColor: 'black',
    marginTop: 100,
    width: 300,
    height: 39,
    backgroundColor: 'white'
  },

  TextInputStyleDescription: {

    height: 100,
    borderRadius: 8,
    borderColor: 'black',
    alignSelf: 'center',
    alignItems: 'center',
    width: '30%',
    marginTop: 20,
    height: 200,
    width: 300,
    borderWidth: 3.0,
    paddingLeft: 4,
    fontWeight: 'bold',
    backgroundColor: 'white'
  },

  SubmitButton: {

    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 3,
    borderColor: '#FAA353',
    marginTop: 10,
    width: '20%',
    height: 30,

  }
})