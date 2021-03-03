import * as React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import firebase from 'firebase'
import db from '../config'
import { Touchable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
export default class Settings extends React.Component {

  constructor() {
    super()

    this.state = {

      FirstName: '',
      SecondName: '',
      Address: '',
      Email: '',
      ContactNumber: '',
      DocumentID: ''

    }
  }

  getCurrentUserDetails = () => {

    var user = firebase.auth().currentUser;
    var email = user.email

    db.collection('UserInfo').where('Email', "==", email).get()

      .then(snapshot => {

        snapshot.forEach(doc => {

          var Data = doc.data()

          this.setState({

            FirstName: Data.FirstName,
            SecondName: Data.LastName,
            Address: Data.Address,
            Email: Data.Email,
            ContactNumber: Data.Contact,
            DocumentID: doc.id

          })
        })
      })
  }


  updateUserDetail = () => {

    var Document = this.state.DocumentID

    db.collection('UserInfo').doc(Document).update({


      FirstName: this.state.FirstName,
      SecondName: this.state.SecondName,
      Address: this.state.Address,
      Email: this.state.Email,
      ContactNumber: this.state.ContactNumber,

    })
  }

  componentDidMount = () => {

    this.getCurrentUserDetails()

  }

  render() {
    return (

      <View style={{ width: 400, alignSelf: 'center', marginLeft: 200 }}>

        <TextInput

          placeholder='FirstName'
          style={styles.TextInputStyle}

          onChangeText={(text) => {

            this.setState({ FirstName: text })

          }}

          value={this.state.FirstName}
        />
        <TextInput

          placeholder='SecondName'
          style={styles.TextInputStyle}

          onChangeText={(text) => {

            this.setState({ SecondName: text })

          }}

          value={this.state.SecondName}
        />

        <TextInput

          placeholder='Address'
          style={styles.TextInputStyle}

          onChangeText={(text) => {

            this.setState({ Address: text })

          }}

          value={this.state.Address}
        />

        <TextInput

          placeholder='Email'
          style={styles.TextInputStyle}

          value={this.state.Email}
        />

        <TextInput

          placeholder='Contact Number'
          style={styles.TextInputStyle}

          onChangeText={(text) => {

            this.setState({ ContactNumber: text })

          }}

          value={this.state.ContactNumber}
        />

        <View>
          <TouchableOpacity style={{ alignSelf: 'center', marginTop: 50, width: '60%', borderWidth: 2, borderRadius: 6, backgroundColor: 'pink' }} onPress={() => {

            this.updateUserDetail()

          }}>

            <Text style={{ alignSelf: 'center' }}>Save</Text>

          </TouchableOpacity>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({


  TextInputStyle: {

    alignSelf: 'center',
    borderBottomWidth: 1.0,
    width: "100%",
    marginTop: 100


  }



})