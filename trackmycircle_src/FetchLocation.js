import React from "react";
import { Button, tyleSheet, Text, View } from "react-native";

const fetchLocation = props => {
	return (
		    <View>
		    <Text h4 style={{ fontWeight:'bold', fontSize: 15, marginRight: 100, paddingBottom: 10, paddingLeft: 60, color:'#196F3D' }}>Here is your connections!</Text>
		    <Button title="Get Others Location" onPress={props.onGetLocation} > </Button>
			
			</View>
			
		);
};

export default fetchLocation;