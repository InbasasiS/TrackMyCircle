import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const usersMap = props => {
	let userLocationMarker = null;
	// console.log("1"+props);
	if (props.userLocation) {
		console.log("1"+props.userLocation);
		userLocationMarker = <MapView.Marker coordinate = {props.userLocation} title={"Me"}/>;
		// userLocationMarker = <Marker coordinate={props.userLocation} image={require('a2.png')}/>
	}

	const usersMarkers = props.usersPlaces.map(userPlace => (
		<MapView.Marker coordinate = {userPlace} key = {userPlace.id} title={userPlace.name}/>
	));

	return (
 		<View style={styles.mapContainer}>
 		 	<MapView 
 		 		 initialRegion={{
			      latitude: 13.00829,
			      longitude: 80.234989,
			      latitudeDelta: 0.0622,
			      longitudeDelta: 0.0421,
			    }}
			    regions = {props.userLocation}
			    style = {styles.map}>
				{userLocationMarker}
				{usersMarkers}
			</MapView>
 		</View>
		);
};


const styles = StyleSheet.create({

	mapContainer: {
		width: '100%',
		height: 200
	},
	map: {
		width: '100%',
		height: '260%'
	}

});
export default usersMap;