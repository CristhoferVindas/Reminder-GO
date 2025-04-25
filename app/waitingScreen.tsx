import useInstitutionsStore from '@/store/institution.store';
import useInstitutions_x_users_x_rolesStore from '@/store/institutionsUsersRoles.store';
import useUsersStore from '@/store/user.store';
import {Institution} from '@/types/Institution';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';

const WaitingScreen = () => {
	const navigation = useNavigation();
	const institution = useInstitutionsStore((state) => state.institution);
	const createInstitutions_x_users_x_rolesByIdUser = useInstitutions_x_users_x_rolesStore(
		(state) => state.createInstitutions_x_users_x_rolesByIdUser
	);
	const usercreatedSuccessful = useUsersStore((state) => state.usercreatedSuccessful);
	useEffect(() => {
		if (usercreatedSuccessful?.id) {
			createInstitutions_x_users_x_rolesByIdUser({
				institutions_id: institution?.id || null,
				users_id: usercreatedSuccessful.id,
				roles_id: 2,
				institutions: institution || ({} as Institution),
				roles: null,
				users: usercreatedSuccessful,
			});
		}
	}, [usercreatedSuccessful]);

	return (
		<View style={styles.container}>
			<View style={styles.waitingContainer}>
				<ActivityIndicator size="large" color="#F97316" style={styles.loader} />
				<Text style={styles.title}>Esperando Aprobación</Text>

				<Text style={styles.message}>
					Gracias por registrarte. Un administrador revisará tu solicitud y te notificará cuando se complete
					el proceso de aprobación.
				</Text>
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login' as never)}>
					<Text style={styles.buttonText}>Ir al inicio de sesión</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#374151',
		padding: 20,
		width: '100%',
	},
	waitingContainer: {
		height: '75%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#374151',
		padding: 20,
		width: '100%',
	},
	buttonContainer: {
		height: '25%',
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: '100%',
		paddingBottom: 40,
	},
	loader: {
		marginBottom: 20,
	},
	title: {
		fontSize: 26,
		fontWeight: 'bold',
		color: '#F97316',
		marginBottom: 15,
		textAlign: 'center',
	},
	message: {
		fontSize: 18,
		color: '#9CA3AF',
		textAlign: 'center',
		paddingHorizontal: 10,
		lineHeight: 24,
	},
	button: {
		backgroundColor: '#F97316',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 8,
		alignItems: 'center',
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: 'bold',
	},
});

export default WaitingScreen;
