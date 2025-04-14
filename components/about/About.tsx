import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AboutScreen = () => {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Image
				source={require('@/images/ReminderGo.png')}
				style={styles.logo}
			/>

			<Text style={styles.appName}>Reminder Go</Text>
			<Text style={styles.version}>Versión 1.0.0</Text>

			<Text style={styles.description}>
				Esta aplicación fue desarrollada para ayudar a los usuarios a gestionar sus actividades de forma
				sencilla y eficiente. Nuestro objetivo es proporcionar una experiencia intuitiva y funcional.
			</Text>

			<View style={styles.section}>
				<Ionicons name="person-circle-outline" size={24} color="#F97316" />
				<Text style={styles.sectionTitle}>Desarrollador</Text>
				<Text style={styles.sectionContent}>Cristhofer Vindas Muñoz</Text>
			</View>

			<View style={styles.section}>
				<Ionicons name="mail-outline" size={24} color="#F97316" />
				<Text style={styles.sectionTitle}>Contacto</Text>
				<Text style={styles.sectionContent}>vindaz4567@gmail.com</Text>
			</View>
			<View style={styles.section}>
				<Ionicons name="person-circle-outline" size={24} color="#F97316" />
				<Text style={styles.sectionTitle}>Desarrollador</Text>
				<Text style={styles.sectionContent}>Arianna Aguilar Leiva</Text>
			</View>

			<View style={styles.section}>
				<Ionicons name="mail-outline" size={24} color="#F97316" />
				<Text style={styles.sectionTitle}>Contacto</Text>
				<Text style={styles.sectionContent}>arianna.aguilar.leiva@est.una.ac.cr</Text>
			</View>

			<Text style={styles.footer}>© 2024 Nombre de la Aplicación. Todos los derechos reservados.</Text>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		alignItems: 'center',
		paddingTop: 100,

		padding: 20,
		backgroundColor: '#1F2937', // Fondo oscuro para la consistencia de la app
	},
	logo: {
		width: 100,
		height: 100,
		marginBottom: 20,
		borderRadius: 50, // Agrega bordes redondeados para darle un toque moderno
	},
	appName: {
		fontSize: 24,
		fontWeight: '700',
		color: '#F3F4F6', // Texto claro en contraste con el fondo oscuro
		marginBottom: 5,
	},
	version: {
		fontSize: 16,
		color: '#A0AEC0', // Color de texto menos resaltado para la versión
		marginBottom: 20,
	},
	description: {
		fontSize: 16,
		color: '#D1D5DB', // Texto en tono gris claro
		textAlign: 'center',
		marginBottom: 20,
		lineHeight: 22,
	},
	section: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		alignContent: 'flex-start',
		justifyContent: 'flex-start',
		marginVertical: 10,
		width: '75%',
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '700',
		marginLeft: 10,
		color: '#F3F4F6', // Título claro para resaltar
	},
	sectionContent: {
		fontSize: 16,
		marginLeft: 10,
		color: '#A0AEC0', // Color menos resaltado para el contenido
	},
	footer: {
		marginTop: 30,
		fontSize: 14,
		color: '#A0AEC0', // Color tenue para el pie de página
		textAlign: 'center',
	},
});

export default AboutScreen;
