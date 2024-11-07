import * as Location from 'expo-location';

const getLocationPermission = async () => {
	let {status} = await Location.requestForegroundPermissionsAsync();
	if (status !== 'granted') {
		alert('Permiso para acceder a la ubicación es necesario');
		return;
	}
	let location = await Location.getCurrentPositionAsync({});
	setRegion({
		latitude: location.coords.latitude,
		longitude: location.coords.longitude,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});
};
