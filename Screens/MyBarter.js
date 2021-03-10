import * as React from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'


export default class MyBarter extends React.Component {

  constructor() {
    super()

    this.state = {

      UserID: firebase.auth().currentUser.email,
      AllMyDonations: []
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

  componentDidMount = () => {

    this.GetAllMyBarters()

  }

  render() {
    return (

      <View style={styles.container}>

        <FlatList

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

                  <TouchableOpacity style={{  borderWidth: 3, backgroundColor: 'lightpink' }} onPress={() => {



                  }}>

                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Send Book</Text>

                  </TouchableOpacity>


                </ListItem>

              </View>
            )
          }} />

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