import React from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';

const FirstScreen = () => {
	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require('@/images/PrimeraImagen.png')}
				width={30}
				height={30}
			></Image>
			<View>
				<Text>¡Nunca más pierdas una fecha importante!</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		height: '100%',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	scrollview: {
		flex: 1,
		alignContent: 'center',
		backgroundColor: 'red',
	},

	text: {
		textAlign: 'auto',
		textAlignVertical: 'center',
	},
	image: {
		height: 300,
		width: 300,
	},
	button: {
		borderRadius: 50,
	},
});

export default FirstScreen;
