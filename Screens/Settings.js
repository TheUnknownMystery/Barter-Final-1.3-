import * as React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import db from '../config'

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

  componentDidMount = () => {

    this.getCurrentUserDetails()

  }

  getCurrentUserDetails = () => {

    var user = firebase.auth().currentUser;
    var User_Email = user.email
    //console.log(User_Email.toUpperCase())
    db.collection('UserInfo').where("Email", '==', User_Email).get()
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


    db.collection('UserInfo').doc(this.state.DocumentID).update({

      FirstName: this.state.FirstName,
      LastName: this.state.SecondName,
      Address: this.state.Address,
      Email: this.state.Email,
      ContactNumber: this.state.ContactNumber,

    })

    alert("Updated Account")
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'lightgrey' }}>
        <View>

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
            <TouchableOpacity style={{ alignSelf: 'center', marginTop: 30, height: '30%', width: '40%', borderWidth: 2, borderRadius: 6, backgroundColor: 'pink' }} onPress={() => {

              this.updateUserDetail()

            }}>

              <Text style={{ alignSelf: 'center', fontWeight: 'bold', marginTop: 4, fontSize: 18 }}>Save</Text>

            </TouchableOpacity>
          </View>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({


  TextInputStyle: {

    alignSelf: 'center',
    borderBottomWidth: 1.0,
    width: 200,
    marginTop: 100

  }



})