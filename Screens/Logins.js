import * as React from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native'
import firebase from 'firebase'
import db from "../config"

export default class login extends React.Component {


  constructor() {
    super()

    this.state = {

      Email: '',
      Password: '',
      ConfirmPassword: '',
      Address: '',
      ContactNumber: '',
      FirstName: '',
      LastName: '',
      isVisible: false

    }
  }

  showModal = () => {
    return (

      <Modal animationType="fade" transparent={true} visible={this.state.isVisible}>

        <View style={styles.ModelContainer}>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>

              <Text style={styles.Title}>Register</Text>

              <TextInput

                placeholder="FirstName"
                maxLength={10}
                style={styles.TextInputStyle}

                onChangeText={(text) => {
                  this.setState({ FirstName: text })
                }}
              />

              <TextInput

                placeholder="LastName"
                maxLength={10}
                style={styles.TextInputStyle}

                onChangeText={(text) => {
                  this.setState({ LastName: text })
                }}
              />

              <TextInput

                placeholder="Email"
                keyboardType='email-address'
                style={styles.TextInputStyle}

                onChangeText={(text) => {
                  this.setState({ Email: text })
                }}
              />

              <TextInput

                placeholder="Password"
                style={styles.TextInputStyle}

                onChangeText={(text) => {
                  this.setState({ Password: text })
                }}
              />

              <TextInput

                placeholder="ConfirmPassword"
                style={styles.TextInputStyle}

                onChangeText={(text) => {
                  this.setState({ ConfirmPassword: text })
                }}
              />

              <TextInput

                placeholder="Address"
                style={styles.TextInputStyle}
                multiline={true}

                onChangeText={(text) => {
                  this.setState({ Address: text })
                }}
              />

              <TextInput

                placeholder="Contact Number"
                keyboardType="number-pad"
                style={styles.TextInputStyle}

                onChangeText={(text) => {
                  this.setState({ ContactNumber: text })
                }}
              />

            </KeyboardAvoidingView>

            <TouchableOpacity style={{ alignItems: 'center', alignSelf: 'center', borderRadius: 7, marginTop: 40, height: '5%', width: '50%', borderWidth: 2, backgroundColor: 'lightpink' }} onPress={() => {

              this.UserSignIn(this.state.Email, this.state.Password, this.state.ConfirmPassword)

            }}>

              <Text style={{ alignSelf: 'center', marginTop: 6, fontWeight: 'bold' }}>Register</Text>

            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: 'center', alignSelf: 'center', borderRadius: 7, marginTop: 20, height: '5%', width: '50%', borderWidth: 2, backgroundColor: 'lightpink' }} onPress={() => {

              this.setState({

                isVisible: false

              })

            }}>

              <Text style={{ alignSelf: 'center', marginTop: 6, fontWeight: 'bold' }}>Cancel</Text>

            </TouchableOpacity>

          </ScrollView>

        </View>
      </Modal>
    )
  }

  UserSignIn = (Email, Password, ConfirmPassword) => {

    if (Password !== ConfirmPassword) {

      return Alert.alert("Password and ConfirmPassword are not same please check again")

    } else {

      firebase.auth().createUserWithEmailAndPassword(Email, Password)
        .then((response) => {

          db.collection("UserInfo").add({

            "FirstName": this.state.FirstName,
            "Email": this.state.Email,
            "LastName": this.state.LastName,
            "Address": this.state.Address,
            "Contact": this.state.ContactNumber,
            "Password": this.state.Password,
            "ConfirmPassword": this.state.ConfirmPassword,

          });

          return Alert.alert(

            "UserAdded(Account created)",
            "",
            [

              { text: 'Ok', onPress: () => this.setState({ isVisible: false }) }

            ]
          )
        })

        .catch(function (error) {

          var errorMessage = error.message;
          return alert(errorMessage);

        })
    }
  }

  UserLogin = async (Email, password) => {

    if (Email && password) {

      try {

        const response = await firebase.auth().signInWithEmailAndPassword(Email, password)

        if (response) {

          alert("Login Sucessful")
          this.props.navigation.navigate("Drawer")


        }
      }

      catch (error) {

        switch (error.code) {

          case 'auth/user-not-found':
            alert("sorry User not found please check you Email and Password")
            break;

          case 'auth/invalid-email':
            alert("Sorry Please check the entered Email/Password again")
            break;
        }
      }
    }
  };

  render() {
    return (

      <View style={{ backgroundColor: 'lightblue', paddingBottom: 160 }}>

        {this.showModal()}
        <View style={{ backgroundColor: 'white', borderRadius: 7, borderWidth: 0, marginTop: 140, paddingTop: 500, marginLeft: 30, marginRight: 30, marginLeft: 20 }}>

          <Text style={{ fontWeight: 'bold', alignSelf: 'center', marginTop: -500, fontSize: 40, color: 'orange' }}>Login or SignUp</Text>

          <TextInput

            placeholder='abc@example.com'
            style={styles.TextInputStyle}
            keyboardType='email-address'

            onChangeText={(text) => {

              this.setState({ Email: text })

            }}
          />

          <TextInput

            placeholder="Password"
            style={styles.TextInputStyle}
            secureTextEntry={true}

            onChangeText={(text) => {

              this.setState({ Password: text })

            }}
          />

          <TouchableOpacity style={styles.loginbutton} onPress={() => {

            this.setState({ isVisible: true })

          }}>

            <Text style={{ alignSelf: 'center' }}>SignIn</Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.loginbutton} onPress={() => {

            this.UserLogin(this.state.Email, this.state.Password)

          }}>

            <Text style={{ alignSelf: 'center', fontWeight: 'normal' }}>Login</Text>

          </TouchableOpacity>
        </View>
      </View>

    )
  }
}
const styles = StyleSheet.create({

  TextInputStyle: {

    alignSelf: 'center',
    borderWidth: 1.5,
    marginTop: 40,
    width: 240,
    borderRadius: 2,
    height: 40
  },

  loginbutton: {

    alignSelf: 'center',
    justifyContent: 'center',
    width: 127,
    height: 37,
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: 'lightblue'

  },

  Title: {

    fontWeight: 'bold',
    fontSize: 29,
    color: 'orange',
    alignSelf: 'center',
    alignItems: 'center',

  },

  ModelContainer: {

    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 100,
    marginBottom: 100,
    paddingBottom: 10,
    backgroundColor: 'white'

  },

  TextInputStyle2: {

    borderWidth: 1.0,
    borderBottomColor: 'black',
    alignSelf: 'center',
    alignItems: 'center',
    width: '60%'

  }
})