import React, {Fragment} from 'react';
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import NavigationService from './NavigationService';
import FetchLocation from './FetchLocation';
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
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import UsersMap from './UsersMap';

export default class LocationMap extends React.Component {

  state = {
    userLocation: null,
    usersPlaces: []
  }

  getUserLocationHandler = () => {
    const userInfo = this.props.navigation.state;
    console.log(userInfo.params.name);
    

    const url = 'https://trackmycircle.firebaseio.com/' +  userInfo.params.circle+"-"+userInfo.params.mail.replace("@gmail.com","")+'.json';
    const circle_users = [];
    fetch(url)
      .then(res => res.json())
      .then(parsedRes => {
        for (const key in parsedRes){
          circle_users.push({
            mail: parsedRes[key].user_mail,
            id: key
          });
        }
        this.updatePlaces(circle_users);
      })    
         
  }

  updatePlaces = (circle_users) => {
    const places = [];
    fetch('https://trackmycircle.firebaseio.com/latlongs.json')
    .then(res => res.json())
    .then(parsedRes => {
      
      console.log("The users in circle "+circle_users); 
      for (const user in circle_users){
        for (const key in parsedRes){
          if(circle_users[user].mail == parsedRes[key].mail){
            places.push({
              latitude: parsedRes[key].latitude,
              longitude: parsedRes[key].longitude,
              mail: parsedRes[key].mail,
              name: parsedRes[key].name,
              id: key
            });
          }
        }
      } 
       this.setState({
            usersPlaces: places
          });
    })
    .catch(err => console.log(err));   
    
  }


  shareMe = () => {
    const userInfo = this.props.navigation.state;
    const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: "Geolocation Permission",
            message: "App needs access to your phone's location.",
        }
    );
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({ userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          }
        });
          fetch('https://trackmycircle.firebaseio.com/latlongs.json',{
            method: 'POST',
            body: JSON.stringify({
              name: userInfo.params.name,
              mail: userInfo.params.mail,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude           
              })
          })
          .then(res => console.log(res))
          .catch(err => console.log(err));
        },
        (error) => {
          console.error(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Share My Location" onPress={this.shareMe} />
        <FetchLocation onGetLocation={this.getUserLocationHandler} />
        <UsersMap userLocation = {this.state.userLocation} usersPlaces = {this.state.usersPlaces}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    backgroundColor: '#E8F8F5',
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
  },
  yellowrect:{
   backgroundColor: '#fce76c',
   height: 300,
   flex: 1,
   flexWrap: 'nowrap',
   width: 300,
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
