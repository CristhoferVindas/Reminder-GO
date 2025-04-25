import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

interface MapScreenProps {
	latitude: number;
	longitude: number;
}

const MapScreen: React.FC<MapScreenProps> = ({latitude, longitude}) => {
	const getLocationPermission = async () => {
		let {status} = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			alert('Permiso para acceder a la ubicación es necesario');
			return;
		}
		setRegion({
			latitude: latitude,
			longitude: longitude,
			latitudeDelta: 1,
			longitudeDelta: 1,
		});
	};
	const [region, setRegion] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 1,
		longitudeDelta: 1,
	});

	useEffect(() => {
		getLocationPermission();
	}, []);

	return (
		<View style={styles.container}>
			<MapView style={styles.map} region={region}>
				<Marker coordinate={region} title="Mi ubicación" />
			</MapView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '50%',
		backgroundColor: '#ffff',
		borderCurve: 'circular',
		borderRadius: 8,
	},
	map: {
		borderRadius: 8,

		width: '100%',
		height: '100%',
	},
});

export default MapScreen;
