import * as React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Header } from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'
import { ListItem } from 'react-native-elements'

export default class NotificationScreen extends React.Component {

  constructor() {
    super()

    this.state = {

      CurrentUser: firebase.auth().currentUser.email,
      AllNotifications: [],

    }
    this.request = null
  }

  getAllNotification = () => {

    this.request = db.collection("Notifications").where("UserID", '==', this.state.CurrentUser).where("NotificationStatus", '==', 'Unread')
      .onSnapshot(snapshot => {

        var AllNotifications = snapshot.docs.map(document => document.data())

        this.setState({

          AllNotifications: AllNotifications

        })
      })
  }

  componentDidMount = () => {

    this.getAllNotification()

  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 30 }}>Your Notification</Text>

        <View>
          {

            this.state.AllNotifications.length === 0
              ? (

                <View>

                  <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: 20, marginTop: 50 }}>Sorry! you dont have any Notifications</Text>

                </View>

              )
              : (
                < FlatList

                  data={this.state.AllNotifications}
                  renderItem={({ item }) => {

                    return (

                      <View>

                        <ListItem bottomDivider>

                          <ListItem.Content>

                            <ListItem.Title>
                              {item.Message}
                            </ListItem.Title>

                            <ListItem.Subtitle>
                              {item.ReciverID}
                            </ListItem.Subtitle>

                          </ListItem.Content>

                        </ListItem>

                      </View>
                      
                    )
                  }}
                />
              )
          }
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    backgroundColor: 'lightgrey'


  }
})