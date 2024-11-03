import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

const WaitingScreen = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="#5C6EF8" style={styles.loader} />
			<Text style={styles.title}>Esperando Aprobación</Text>
			<Text style={styles.message}>
				Gracias por registrarte. Un administrador revisará tu solicitud y te notificará cuando se complete
				el proceso de aprobación.
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#1e293b',
		padding: 20,
		height: '100%',
		width: '100%',
	},
	loader: {
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#5C6EF8',
		marginBottom: 10,
		textAlign: 'center',
	},
	message: {
		fontSize: 16,
		color: '#D1D5DB',
		textAlign: 'center',
	},
});

export default WaitingScreen;
