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

  getCurrentUserDetails = () => {

    var user = firebase.auth().currentUser;
    var Email = user.email

    db.collection('UserInfo').where("Email", '==', Email).get()

      .then(snapshot => {
        
        snapshot.forEach(doc => {

          this.setState({

            FirstName: doc.data().FirstName,
            SecondName: doc.data().LastName,
            Address: doc.data().Address,
            Email: doc.data().Email,
            ContactNumber: doc.data().Contact,
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

  componentDidMount = () => {

    this.getCurrentUserDetails()

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