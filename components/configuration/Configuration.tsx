import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import useUsersStore from '@/store/user.store';
import { useRouter } from 'expo-router';
import { firebaseConfig } from '@/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut as firebaseSignOut } from 'firebase/auth';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Configuration = () => {
	const setUser = useUsersStore((state) => state.setUser);
	const router = useRouter();


	const logout = async () => {
		try {
			await GoogleSignin.revokeAccess();
			await GoogleSignin.signOut();
			await firebaseSignOut(auth);
			setUser(null);
			router.replace('/login');
		} catch (error) {
			console.error('Error al hacer logout:', error);
		}
	};

	const gotoAboutScreen = async () => {
		try {
			router.navigate('/about');
		} catch (error) {
			console.error('Error al hacer logout:', error);
		}
	};
	const gotoComingSoonScreen = async () => {
		try {
			router.navigate('/comingsoon');
		} catch (error) {
			console.error('Error al hacer logout:', error);
		}
	};
	const gotoChangeInstitutionScreen = async () => {
		try {
			router.navigate('/changeinstitution');
		} catch (error) {
			console.error('Error al hacer logout:', error);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Configuración</Text>
			<TouchableOpacity style={styles.option} onPress={gotoComingSoonScreen}>
				<Text style={styles.optionText}>Filtros</Text>
				<Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
			</TouchableOpacity>
			<TouchableOpacity style={styles.option} onPress={gotoComingSoonScreen}>
				<Text style={styles.optionText}>Aspecto</Text>
				<Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
			</TouchableOpacity>
			<TouchableOpacity style={styles.option} onPress={gotoComingSoonScreen}>
				<Text style={styles.optionText}>Idioma</Text>
				<Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
			</TouchableOpacity>
			<TouchableOpacity style={styles.option} onPress={gotoChangeInstitutionScreen}>
				<Text style={styles.optionText}>Cambiar institucion</Text>
				<Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
			</TouchableOpacity>
			<TouchableOpacity style={styles.option} onPress={gotoAboutScreen}>
				<Text style={styles.optionText}>Acerca de</Text>
				<Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
			</TouchableOpacity>
			<View style={styles.logOutContainer}>
				<TouchableOpacity style={styles.option} onPress={logout}>
					<Text style={styles.optionText}>Cerrar Sesión</Text>
					<Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1E293B',
		padding: 20,
	},
	logOutContainer: {
		justifyContent: 'flex-end',
		flex: 1,
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#F97316',
		marginBottom: 20,
		textAlign: 'center',
	},
	option: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#374151',
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 8,
		marginBottom: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	optionText: {
		fontSize: 18,
		color: '#FFFFFF',
	},
});

export default Configuration;
