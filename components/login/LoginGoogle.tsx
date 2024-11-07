import {useEffect, useState} from 'react';
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from '@react-native-google-signin/google-signin';
import {getAuth, GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import {
	Alert,
	Text,
	View,
	StyleSheet,
	ActivityIndicator,
	Modal,
	TouchableOpacity,
} from 'react-native';
import {firebaseConfig} from '@/firebaseConfig';
import {initializeApp} from 'firebase/app';
import useUsersStore from '@/store/user.store';
import {User} from '@/types/User.type';
import useInstitutions_x_users_x_rolesStore from '@/store/institutionsUsersRoles.store';
import {Link, useNavigation} from '@react-navigation/native';
import {Role} from '@/types/Role.type';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function LoginGoogle() {
	const navigation = useNavigation();
	const [user, setUser] = useState<User | null | undefined>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const setUserInStore = useUsersStore((state) => state.setUser);
	const getInstitutions_x_users_x_rolesByEmails = useInstitutions_x_users_x_rolesStore(
		(state) => state.getInstitutions_x_users_x_rolesByEmails
	);
	const insti_x_users_x_roles = useInstitutions_x_users_x_rolesStore(
		(state) => state.institution_x_users_x_roles
	);

	useEffect(() => {
		GoogleSignin.configure({
			webClientId: '677379829038-0s8me94qm20o8dl38uti35755a1ugq5e.apps.googleusercontent.com',
		});
	}, []);

	useEffect(() => {
		if (user && insti_x_users_x_roles) {
			setUserInStore({
				name: insti_x_users_x_roles?.users?.name || '',
				mail: insti_x_users_x_roles?.users?.mail || '',
				image: insti_x_users_x_roles?.users.image || '',
				first_last_name: insti_x_users_x_roles?.users.first_last_name || '',
				second_last_name: insti_x_users_x_roles?.users.second_last_name || '',
				id: insti_x_users_x_roles?.users?.id,
				institutions: insti_x_users_x_roles?.institutions,
				roles: insti_x_users_x_roles?.roles || ({} as Role),
			});
		} else if (user && !insti_x_users_x_roles) {
			setIsModalVisible(true);
		}
	}, [user, insti_x_users_x_roles]);

	const handleGoogleSignIn = async () => {
		setIsLoading(true);
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			const {data} = userInfo;
			const googleCredential = GoogleAuthProvider.credential(data?.idToken);
			const userCredential = await signInWithCredential(auth, googleCredential);
			const loggedInUser = userCredential.user;

			await getInstitutions_x_users_x_rolesByEmails(loggedInUser.email || '');
			const nameParts = data?.user?.name?.split(' ') || [];
			const newUser: User = {
				name: nameParts[0] || '',
				first_last_name: nameParts[1] || '',
				second_last_name: nameParts[2] || '',
				mail: data?.user?.email || '',
				image: data?.user?.photo || '',
				institutions: insti_x_users_x_roles?.institutions,
				roles: insti_x_users_x_roles?.roles || ({} as Role),
			};
			setUser(newUser);
		} catch (error: any) {
			handleSignInError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSignInError = (error: any) => {
		if (error.code === statusCodes.SIGN_IN_CANCELLED) {
			console.log('El usuario canceló el flujo de inicio de sesión.');
		} else if (error.code === statusCodes.IN_PROGRESS) {
			console.log('El inicio de sesión está en progreso.');
		} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
			console.log('Google Play Services no está disponible o está desactualizado.');
		} else {
			console.error('Ocurrió un error:', error.message || error);
			Alert.alert('Error al iniciar sesión', error.message || 'Ocurrió un error desconocido.');
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Iniciar Sesión</Text>
			<Text style={styles.subtitle}>Accede a tu cuenta con Google</Text>

			{isLoading ? (
				<ActivityIndicator size="large" color="#F97316" style={styles.loadingIndicator} />
			) : (
				<GoogleSigninButton
					style={styles.googleButton}
					size={GoogleSigninButton.Size.Wide}
					color={GoogleSigninButton.Color.Dark}
					onPress={handleGoogleSignIn}
				/>
			)}

			<Text style={styles.disclaimer}>Tu información se mantendrá privada y segura.</Text>
			<Text style={styles.registerPrompt}>¿No te has registrado?</Text>
			<Link
				to="/"
				children={
					<Text style={styles.registerLink} onPress={() => navigation.navigate('SignInGoogle' as never)}>
						Registrarse Ahora
					</Text>
				}
			/>

			<Modal
				animationType="slide"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={() => setIsModalVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>El usuario no se ha registrado.</Text>
						<Text style={styles.modalText}>
							Parece que aún no tienes una cuenta registrada. ¡Regístrate para comenzar a disfrutar de nuestros
							servicios!
						</Text>
						<TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
							<Text style={styles.closeButtonText}>Cerrar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#374151',
		padding: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#F97316',
	},
	subtitle: {
		fontSize: 16,
		color: '#9CA3AF',
		marginBottom: 30,
		textAlign: 'center',
	},
	googleButton: {
		width: '80%',
		height: 60,
		marginBottom: 20,
		borderRadius: 8,
		overflow: 'hidden',
	},
	disclaimer: {
		fontSize: 15,
		color: '#9CA3AF',
		marginTop: 10,
		textAlign: 'center',
	},
	registerPrompt: {
		fontSize: 20,
		color: '#9CA3AF',
		marginTop: 15,
		textAlign: 'center',
	},
	registerLink: {
		fontSize: 20,
		color: '#F97316',
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 5,
	},
	loadingIndicator: {
		marginVertical: 20,
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
	},
	modalView: {
		width: '85%',
		padding: 25,
		backgroundColor: '#1F2937',
		borderRadius: 10,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
	},
	modalText: {
		fontSize: 18,
		color: '#F3F4F6',
		marginBottom: 10,
		textAlign: 'center',
	},
	closeButton: {
		backgroundColor: '#F97316',
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginTop: 15,
	},
	closeButtonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
