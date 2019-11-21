import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Linking,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import Dashboard from "./Dashboard";
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

GoogleSignin.configure({
  webClientId: "103949559192-ucbu2rkvh0sr5rvuptj5smkpmklkkm4t.apps.googleusercontent.com",
  offlineAccess: true
});


export default class GoogleLogin extends React.Component{

	constructor(){
	super();
	this.state={};
	}
	 
  _signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();

    const userInfo = await GoogleSignin.signIn();
    if (userInfo){
      // this.props.navigation.navigate("Dashboard");
      // this.props.navigation.dispatch(StackActions.reset({
      //         index: 0,
      //         actions: [
      //           NavigationActions.navigate({ routeName: 'Dashboard' })
      //         ],
      //       }))
      alert('Hello ' + userInfo.user.name);
      this.props.navigation.navigate("Dashboard", {name: userInfo.user.name, mail: userInfo.user.email});
      // alert('Successfully Logged in' + '\n' + 'E-mail : ' + userInfo.user.email +'\n'+ 'Username : ' + userInfo.user.name);
      
    }
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};

render() { 

  return (
  <View style={styles.container} style={{ backgroundColor: '#fce76c', width: 300, marginLeft:29 }}>
  <Text style={styles.welcome}>Track My Circle</Text>
  <GoogleSigninButton style={styles.button}
    style={{ width: 260, height: 48, marginTop: 200 , marginLeft:17}}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={this._signIn}
    disabled={false}
    />
    </View>)

}
}

const styles = StyleSheet.create({

  container: {
    flex:1,
    backgroundColor: '#000',
  },
  cont:{
   flex:1,
    backgroundColor: '#ffffff'
  },
  backimg:{
      alignSelf:'flex-start',
  },
  welcome: {
    fontWeight:'bold',
    color:'#000',
    fontSize: 30,
    textAlign: 'center',
    marginTop:100,
    marginBottom:50,
    padding: 40
  },
  yellowrect:{
   backgroundColor: '#fce76c',
   height: 300,
   flex: 1,
   flexWrap: 'nowrap',
   width: 100,
  },
  input:{
   padding: 10,
   width:250,
   alignSelf: 'flex-end',
   borderColor: '#A9A9A9',
   borderBottomWidth: 2,
   marginTop: 10,
 },
  textButton:{
   fontSize: 20,
   textAlign: 'center',
 },
 button:{
   marginTop: 300,
   width: 150,
   alignSelf: 'center',
   padding: 30,
   borderRadius: 30,
   borderStyle: 'solid',
   borderWidth: 2,
   marginBottom: 40,
   borderColor: '#000',
 },
    forgotButtonText:{
        textAlign:'center',

        marginBottom:10,
    },
    backimg: {
    padding: 10,
    alignSelf:'flex-start',
    marginTop: 15,
    height: 25,
    width: 25,
    resizeMode : 'stretch',

},
mail:{
  padding: 10,

    top: 70,
    left:10,
    height: 20,
    width: 25,
    },
passw:{
  padding: 10,
    left:10,
    top: 108,
    height: 20,
    width: 25,
}

});
