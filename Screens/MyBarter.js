import * as React from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem, Header } from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'


export default class MyBarter extends React.Component {

  constructor() {
    super()

    this.state = {

      UserID: firebase.auth().currentUser.email,
      AllMyDonations: [],
      User_Name: '',
    }
  }

  GetAllMyBarters = () => {

    db.collection("MyBarter").where("Donor", '==', this.state.UserID)
      .onSnapshot(snapshot => {

        var AllDonations = snapshot.docs.map(document => document.data())
        this.setState({

          AllMyDonations: AllDonations

        })
      })
  }

  getUserName = (UserID) => {

    db.collection("UserInfo").where('Email', "==", UserID).get()
      .then(snapshot => {
        snapshot.forEach(doc => {

          this.setState({

            User_Name: doc.data().FirstName + " " + doc.data().LastName

          })
        })

      })
  }

  componentDidMount = () => {

    this.GetAllMyBarters()
    this.getUserName(this.state.UserID)
  }

  SendNotification = (BookDetials, RequestStatus) => {

    var Request_ID = BookDetials.ItemID
    var Donor_ID = BookDetials.Donor

    db.collection("Notifications").where("RequestID", '==', Request_ID).where("UserID", '==', Donor_ID).get()

      .then(snapshot => {

        snapshot.forEach(doc => {

          var Message = this.state.User_Name + ' sent you book'

          db.collection("Notifications").doc(doc.id).update({

            "Message": Message,
            "Date": firebase.firestore.FieldValue.serverTimestamp(),
            "NotificationStatus": 'Unread'
          })
        })
      })
  }

  render() {
    return (

      <View style={styles.container}>

        <Text style={styles.Title}>MyBarters</Text>
        {

          this.state.AllMyDonations.length === 0
            ? (

              <Text style = {{alignSelf: 'center' , fontWeight: 'bold' , marginTop: 40 , fontSize: 30}}>Sorry Looks like you have not Donated yet</Text>

            ) : (

              < FlatList

                data={this.state.AllMyDonations}
                renderItem={({ item, i }) => {
                  return (

                    <View>

                      <ListItem bottomDivider>
                        <ListItem.Content>
                          <ListItem.Title style={{ color: 'black', fontWeight: 'bold' }}>

                            {item.BookName}

                          </ListItem.Title>

                          <ListItem.Subtitle>

                            {item.RequestedBy}

                          </ListItem.Subtitle>
                        </ListItem.Content>

                        <TouchableOpacity style={{ borderWidth: 3, backgroundColor: 'lightpink' }} onPress={() => {

                          this.SendNotification(item)

                        }}>

                          <Text style={{ color: 'black', fontWeight: 'bold' }}>Send Book</Text>

                        </TouchableOpacity>


                      </ListItem>

                    </View>
                  )
                }} />
            )
        }
      </View>

    )
  }
}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    backgroundColor: 'lightgrey'

  },

  Title: {

    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 30,
    fontSize: 30

  }
})