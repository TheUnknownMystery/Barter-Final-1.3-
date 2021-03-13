import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Card } from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'

export default class Trade extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

      UserID: firebase.auth().currentUser.email,
      Item_Name: this.props.navigation.getParam("Details")["Item_Name"],
      Item_Defination: this.props.navigation.getParam("Details")["Item_Definition"],
      Item_ID: this.props.navigation.getParam("Details")["ItemId"],
      Reciver_User_ID: this.props.navigation.getParam("Details")["UserID"],
      User_Name: '',

      ReciverName: '',
      ReciverContact: '',
      ReciverAddress: '',

    }
  }


  componentDidMount = () => {

    this.getReciverDetials()
    this.getUserName(this.state.UserID)
  }

  getReciverDetials = () => {
    //console.log(this.state.Reciver_User_ID)
    db.collection("UserInfo").where("Email", '==', this.state.Reciver_User_ID).get()
      .then(snapshot => {
        snapshot.forEach(doc => {

          this.setState({

            ReciverName: doc.data().Email,
            ReciverAddress: doc.data().Address,
            ReciverContact: doc.data().Contact

          })
        })
      })
  }

  getUserName = (UserID) => {
    //console.log(  UserID)
    db.collection("UserInfo").where('Email', "==", UserID).get()
      .then(snapshot => {
        snapshot.forEach(doc => {

          this.setState({

            User_Name: doc.data().FirstName + " " + doc.data().LastName

          })
        })

      })
  }

  AddBarter = () => {

    db.collection("MyBarter").add({

      'BookName': this.state.Item_Name,
      'BookDefination': this.state.Item_Defination,
      'RequestedBy': this.state.Reciver_User_ID,
      'ItemID': this.state.Item_ID,
      'Donor': this.state.UserID,
      'RequestStatus': 'Donor interested'
    })
  }

  AddNotification = () => {

    var Message = this.state.User_Name + ' Has shown interest in Donating';

    db.collection("Notifications").add({

      "UserID": this.state.UserID,
      "ReciverID": this.state.Reciver_User_ID,
      "Date": firebase.firestore.FieldValue.serverTimestamp(),
      "NotificationStatus": "Unread",
      'RequestID': this.state.Item_ID,
      "Message": Message,
      'BookName': this.state.Item_Name
    })
  }

  render() {
    return (


      <View style={styles.Container}>

        <View style={{ flex: 0.3 }}>

          <Card
            title={"Book Information"}
            titleStyle={{ fonSize: 20 }}>

            <Card>

              <Text style={{ fontWeight: 'bold' }}>Book Name : {this.state.Item_Name}</Text>

            </Card>

            <Card>

              <Text style={{ fontWeight: 'bold' }}>Item Defination: {this.state.Item_Defination}</Text>

            </Card>



          </Card>

        </View>

        <View style={{ flex: 0.3, paddingTop: 70 }}>

          <Card

            title={"ReciverInformaton"}
            titleStyle={{ fontSize: 20 }}>

            <Card>

              <Text style={{ fontWeight: 'bold' }}>ReciverName : {this.state.ReciverName}</Text>

            </Card>

            <Card>

              <Text style={{ fontWeight: 'bold' }}>ReciverContact: {this.state.ReciverAddress}</Text>

            </Card>

            <Card>

              <Text style={{ fontWeight: 'bold' }}>ReciverAddress: {this.state.ReciverContact}</Text>

            </Card>

            <Card>

              <Text style={{ fontWeight: 'bold' }}>Reciver ID : {this.state.Reciver_User_ID}</Text>

            </Card>

          </Card>

        </View>

        <View style={styles.buttonContainer}>
          {

            this.state.Reciver_User_ID !== this.state.UserID
              ? (
                < TouchableOpacity style={styles.button} onPress={() => {

                  this.AddBarter()
                  this.AddNotification()
                  this.props.navigation.navigate("MyBarter")
                }}>

                  <Text style={{ marginTop: 10, alignSelf: 'center', fontWeight: 'bold' }}>I want to Trade!</Text>

                </TouchableOpacity>
              ) :
              null
          }
        </View>
      </View >

    )
  }
}

const styles = StyleSheet.create({

  Container: {

    flex: 1

  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 190
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8
    }
  }
})