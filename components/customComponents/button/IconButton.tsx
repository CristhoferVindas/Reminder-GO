import React from 'react';
import {Image} from 'react-native';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const IconButton = () => {
	return (
		<TouchableOpacity style={styles.button}>
			<Image source={require('@/images/logo-de-google-48.png')} />
			<Text style={styles.buttonText}>Continuar con Google</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'blue',
		padding: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: '#fff',
		marginLeft: 10,
	},
});

export default IconButton;
