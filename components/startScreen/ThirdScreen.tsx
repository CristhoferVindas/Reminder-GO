import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const ThirdScreen = () => {
	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require('@/images/TerceraImagen.png')}
				width={30}
				height={30}
			></Image>
			<View>
				<Text>Todo lo que necesitas saber, al alcance de tus manos.</Text>
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

export default ThirdScreen;
