// //import liraries
// import React, { Component } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import FBSDK, {
//   LoginManager,
//   AccessToken,
//   LoginButton,
//   GraphRequest,
//   GraphRequestManager
// } from "react-native-fbsdk";
// // create a component
// class MyClass extends Component {
//   _fbAuth() {
//     LoginManager.logInWithReadPermissions(["public_profile"]).then(function(
//       result
//     ) {
//       if (result.isCancelled) {
//         alert("Login cancelled");
//       } else {
//         alert(
//           "Login success with permissions: " +
//             result.grantedPermissions.toString()
//         );
//       }
//     }),
//       function(error) {
//         alert("Login fail with error: " + error);
//       };
//   }

//   //Create response callback.
//   _responseInfoCallback(error, result) {
//     if (error) {
//       alert("Error fetching data: " + error.toString());
//     } else {
//       console.log(result);
//       alert("WELCOME " + result.name);
//     }
//   }
//   // Start the graph request.
//   _requestInfo() {
//     console.log("requesting info");
//     // Create a graph request asking for user information with a callback to handle the response.
//     const infoRequest = new GraphRequest(
//       "/me",
//       null,
//       this._responseInfoCallback
//     );
//     new GraphRequestManager().addRequest(infoRequest).start();
//   }

//   renderSpinner() {
//     if (this.state.loading) {
//       return <Spinner size="small" />;
//     }

//     return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <View>
//           <Text style={styles.welcome}>Welcome</Text>
//         </View>
//         <LoginButton
//           publishPermissions={["publish_actions"]}
//           onLoginFinished={(error, result) => {
//             if (error) {
//               alert("login has error: " + result.error);
//             } else if (result.isCancelled) {
//               alert("login is cancelled.");
//             } else {
//               console.log("result: ", result);
//               AccessToken.getCurrentAccessToken().then(data => {
//                 console.log("token info: ", data);
//                 // alert(data.accessToken.toString());
//                 this._requestInfo();
//               });
//             }
//           }}
//           onLogoutFinished={() => alert("logout.")}
//           style={styles.fbButton}
//         />
//       </View>
//     );
//   }
// }

// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "white",
//   },
//   fbButton: {
//     width: "90%",
//     height: "12.5%",
//     // height: '50%',
//     // borderWidth: 1,
//     // borderRadius: 2,
//     // borderColor: '#ddd',
//     // borderBottomWidth: 0,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 10,
//     elevation: 5,
//     margin: 'auto'
//     // marginLeft: 5,
//     // marginRight: 5,
//     // marginTop: 10,
//   },
//   welcome: {
//     fontFamily: "Zapfino",
//     fontSize: 50,
//     textAlign: "center",
//     margin: 'auto'
//   },
//   instructions: {
//     fontFamily: "HelveticaNeue-UltraLightItalic",
//     fontSize: 50,
//     textAlign: "center",
//     color: "#333333",
//     marginBottom: 5
//   }
// });

// //make this component available to the app
// export default MyClass;


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

class MyClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this._setupGoogleSignin();
  }

  render() {
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <GoogleSigninButton style={{ width: 212, height: 48 }} size={GoogleSigninButton.Size.Standard} color={GoogleSigninButton.Color.Dark} onPress={this._signIn.bind(this)} />
        </View>
      );
    }

    if (this.state.user) {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Welcome {this.state.user.name}</Text>
          <Text>Your email is: {this.state.user.email}</Text>

          <TouchableOpacity onPress={() => { this._signOut(); }}>
            <View style={{ marginTop: 50 }}>
              <Text>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId: process.env.google_client,
       
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({ user });
    }
    catch (err) {
      console.log("Google signin error", err.code, err.message);
    }
  }

  _signIn() {
    GoogleSignin.signIn()
      .then((user) => {
        console.log(user);
        this.setState({ user: user });
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })
      .done();
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({ user: null });
    })
      .done();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
export default MyClass;
// AppRegistry.registerComponent('GoogleSigninSampleApp', () => GoogleSigninSampleApp);