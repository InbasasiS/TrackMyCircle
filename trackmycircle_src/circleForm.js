import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
  Button
} from "react-native";

import { StackNavigator } from "react-navigation";

export default class circleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circle_name: "",
      user_mail: "",
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#001B21",
      elevation: null
    }
  };

  // async onRegisterPress() {
  //   const { circle_name, user_mail } = this.state;
  //   console.log("fdf"+circle_name);
  //   console.log(user_mail);
  //   // await AsyncStorage.setItem("email", email);
  //   // await AsyncStorage.setItem("name", name);
  //   // await AsyncStorage.setItem("password", password);
  //   // this.props.navigation.navigate("Boiler");
  // }

 onRegisterPress = () => {
    console.log("Circle - "+this.state.circle_name);
    console.log("Mail - "+this.state.user_mail);
    const userInfo = this.props.navigation.state;
    const url = 'https://trackmycircle.firebaseio.com/' + this.state.circle_name+"-"+userInfo.params.mail.replace("@gmail.com","") +'.json';
    fetch(url,{
            method: 'POST',
            body: JSON.stringify({
              user_mail: this.state.user_mail          
              })
          })
          .then(res => console.log(res))
          .catch(err => console.log(err));
    // this.props.navigation.navigate("LocationMap", {name: userInfo.params.name, mail: userInfo .params.mail});
  };

  render() {
    return (
      <View behavior="padding" style={styles.container}>
        <Text style={styles.subtext}>Add members into a circle</Text>
        <KeyboardAvoidingView>
          <TextInput
            value={this.state.circle_name}
            onChangeText={circle_name => this.setState({ circle_name })}
            style={styles.input}
            placeholder="Circle Name"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.emailInput.focus()}
          />
          <TextInput
            value={this.state.user_mail}
            onChangeText={user_mail => this.setState({ user_mail })}
            style={styles.input}
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            ref={input => (this.emailInput = input)}
            onSubmitEditing={() => this.passwordCInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="User E-mail id"
          />
          
        </KeyboardAvoidingView>

           <Button title="Add to Circle" onPress={this.onRegisterPress.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1.2,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#001B21",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 150
  },
  input: {
    height: 40,
    width: 350,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    paddingHorizontal: 10
  },
  button: {
    height: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "stretch",
    marginTop: 10,
    justifyContent: "center",
    paddingVertical: 15,
    marginBottom: 10
  },
  buttonText: {
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
  subtext: {
    color: "#ffffff",
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20
  }
});

