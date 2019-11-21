import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import t from 'tcomb-form-native'; // 0.6.9



import {
  Platform,
  StyleSheet,
  Text,
  Linking,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  Button
} from 'react-native';
import GoogleLogin from "./GoogleLogin";
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import LocationMap from './LocationMap';
import circleForm from './circleForm';

class Dashboard extends React.Component {

  constructor(){
    super();
    this.state = {
      circle_name: "",
    };
  }


  // componentWillMount(){

  //   const userInfo = this.props.navigation.state;

  //   fetch('https://trackmycircle.firebaseio.com/userInfo.json',{
  //           method: 'POST',
  //           body: JSON.stringify({
  //             name: userInfo.params.name,
  //             mail: userInfo .params.mail          
  //             })
  //         })
  //         .then(res => console.log(res))
  //         .catch(err => console.log(err));
  // }


  _signOut = async () => {
    
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.props.navigation.navigate("GoogleLogin");
      this.setState({ userInfo: null, error: null });
      
    } catch (error) {
      this.setState({
        error,
      });
    }
  };

  tracking = () => {
    console.log("tracking page");
    console.log("Circle - "+this.state.circle_name);
    const userInfo = this.props.navigation.state;
    this.props.navigation.navigate("LocationMap", {name: userInfo.params.name, mail: userInfo.params.mail, circle: this.state.circle_name});
  };

  circlePage = () => {
    const userInfo = this.props.navigation.state;
    this.props.navigation.navigate("circleForm", {name: userInfo.params.name, mail: userInfo.params.mail});
  };


  render() {

    return (
      <View>
        
      <TouchableOpacity activeOpacity={0.5} style={{ fontWeight:'bold', fontSize: 20, marginLeft: 200}} onPress={this._signOut} disabled={false}>
              <Text style={styles.welcome}>
               Logout
              </Text>
            </TouchableOpacity>
       <KeyboardAvoidingView style={{ marginLeft: 20}}>
        <TextInput
            value={this.state.circle_name}
            onChangeText={circle_name => this.setState({ circle_name })}
            style={styles.input}
            placeholder="Circle Name"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.emailInput.focus()}
          />
           </KeyboardAvoidingView>
      <Text style={{ fontWeight:'bold', fontSize: 15, marginRight: 100, padding: 20 }} onPress={this.tracking} >Proceed to the Tracking Page</Text>
      <Text style={{ fontWeight:'bold', fontSize: 15, marginRight: 100, padding: 20 }} onPress={this.circlePage} >Add new members to a circle</Text>

      </View>
    );
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
    color:'#FFA500',
    fontSize: 20,
    textAlign: 'right',
    padding: 20
  },
  yellowrect:{
   backgroundColor: '#fce76c',
   height: 300,
   flex: 1,
   flexWrap: 'nowrap',
   width: 300,
  },
  input: {
    height: 40,
    width: 200,
    marginBottom: 10,
    backgroundColor: "#808080",
    color: "#fff",
    padding: 10
  },
  textButton:{
   fontSize: 7,
   textAlign: 'center',
 },
 button:{
   marginTop: 100,
   width: 80,
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
export default withNavigation(Dashboard);
