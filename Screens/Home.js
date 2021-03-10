import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScroolView, FlatList } from 'react-native'
import db from '../config'
import firebase from 'firebase'
import { ListItem } from 'react-native-elements'

export default class Home extends React.Component {

  constructor() {
    super()

    this.state = {

      UserItemInfo: [],
      UserEmail: firebase.auth().currentUser.email,
      ItemName: '',
      ItemDefination: '',
      ExchangerName: '',
      ExchangerContact: '',
      ExchangerID: ''

    }
  }


  componentDidMount = async () => {

    const query = await db.collection("AddedItem").get()

    query.docs.map((doc) => {

      this.setState({ UserItemInfo: [...this.state.UserItemInfo, doc.data()] })

    })


  }



  render() {
    return (

      <View style={{ flex: 1, backgroundColor: '#E9E6F9' }}>

        <FlatList
          data={this.state.UserItemInfo}
          renderItem={({ item }) => {

            return (

              <View style={{ padding: 3, borderBottomWidth: 2, borderColor: 'lightgrey' }}>

                <ListItem bottomDivider>

                  <ListItem.Content>

                    <ListItem.Title style={{ fontWeight: 'bold', color: 'black' }}>

                      {item.Item_Name}

                    </ListItem.Title>

                    <ListItem.Subtitle style={{ color: 'grey' }}>

                      {item.Item_Definition}

                    </ListItem.Subtitle>

                  </ListItem.Content>


                  <TouchableOpacity style={{ backgroundColor: 'orange', width: 70, borderWidth: 2, borderColor: 'grey' }} onPress={() => {

                    this.props.navigation.navigate('Trade', { "Details": item })

                  }}>

                    <Text style={{ fontSize: 14, alignSelf: 'center', fontWeight: 'bold' }}>Exchange</Text>

                  </TouchableOpacity>

                </ListItem>
              </View>
            )
          }} />

      </View>
    )
  }
}