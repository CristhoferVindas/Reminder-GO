import {useEffect, useState} from 'react';
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from '@react-native-google-signin/google-signin';
import {getAuth, GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import {Alert, Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {firebaseConfig} from '@/firebaseConfig';
import {initializeApp} from 'firebase/app';
import useUsersStore from '@/store/user.store';
import {User} from '@/types/User.type';
import useInstitutions_x_users_x_rolesStore from '@/store/institutionsUsersRoles.store';
import useInstitutionsStore from '@/store/institution.store';
import {Institution} from '@/types/Institution';
import {Link, useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {Role} from '@/types/Role.type';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function SignUpGoogle() {
	const institution = useInstitutionsStore((state) => state.institution);
	const institutions = useInstitutionsStore((state) => state.institutions);
	const setInstitution = useInstitutionsStore((state) => state.setInstitution);
	const getInstitutions = useInstitutionsStore((state) => state.getInstitutions);

	const [user, setUser] = useState<User | null | undefined>(null);
	const [isLoading, setIsLoading] = useState({institutions: true, auth: false});

	const setUserInStore = useUsersStore((state) => state.setUser);
	const createUser = useUsersStore((state) => state.createUser);
	const getInstitutions_x_users_x_rolesByEmails = useInstitutions_x_users_x_rolesStore(
		(state) => state.getInstitutions_x_users_x_rolesByEmails
	);
	const createInstitutions_x_users_x_rolesByIdUser = useInstitutions_x_users_x_rolesStore(
		(state) => state.createInstitutions_x_users_x_rolesByIdUser
	);
	const insti_x_users_x_roles = useInstitutions_x_users_x_rolesStore(
		(state) => state.institution_x_users_x_roles
	);

	useEffect(() => {
		setIsLoading((prev) => ({...prev, institutions: true}));
		getInstitutions('A').finally(() => setIsLoading((prev) => ({...prev, institutions: false})));

		GoogleSignin.configure({
			webClientId: '677379829038-0s8me94qm20o8dl38uti35755a1ugq5e.apps.googleusercontent.com',
		});
	}, []);

	useEffect(() => {
		if (user && !insti_x_users_x_roles?.users?.id) {
			createUser(user);
		}
		if (insti_x_users_x_roles && user) {
			setUserInStore({
				name: insti_x_users_x_roles.users?.name || '',
				mail: insti_x_users_x_roles.users?.mail || '',
				image: insti_x_users_x_roles.users?.image || '',
				first_last_name: insti_x_users_x_roles.users?.first_last_name || '',
				second_last_name: insti_x_users_x_roles.users?.second_last_name || '',
				id: insti_x_users_x_roles.users?.id,
				institutions: insti_x_users_x_roles.institutions,
				roles: insti_x_users_x_roles.roles || ({} as Role),
			});
			Alert.alert('Registro exitoso', `Registro exitoso en ${institution?.name}`);
		}
	}, [user, insti_x_users_x_roles]);

	const handleGoogleSignUp = async () => {
		setIsLoading((prev) => ({...prev, auth: true}));
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			const {data} = userInfo;
			const googleCredential = GoogleAuthProvider.credential(data?.idToken);
			const userCredential = await signInWithCredential(auth, googleCredential);
			const loggedInUser = userCredential.user;

			await getInstitutions_x_users_x_rolesByEmails(loggedInUser.email || '');
			const nameParts = data?.user?.name?.split(' ') || [];
			setUser({
				name: nameParts[0] || '',
				first_last_name: nameParts[1] || '',
				second_last_name: nameParts[2] || '',
				mail: data?.user?.email || '',
				image: data?.user?.photo || '',
				institutions: insti_x_users_x_roles?.institutions,
				roles: insti_x_users_x_roles?.roles || ({} as Role),
			});
		} catch (error: any) {
			handleSignInError(error);
		} finally {
			setIsLoading((prev) => ({...prev, auth: false}));
		}
	};

	const handleSignInError = (error: any) => {
		if (error.code === statusCodes.SIGN_IN_CANCELLED) {
			console.log('El usuario canceló el flujo de registro.');
		} else if (error.code === statusCodes.IN_PROGRESS) {
			console.log('El registro está en progreso.');
		} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
			console.log('Google Play Services no está disponible o está desactualizado.');
		} else {
			console.error('Ocurrió un error:', error.message || error);
			Alert.alert('Error al registrarse', error.message || 'Ocurrió un error desconocido.');
		}
	};

	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Regístrate</Text>
			<Text style={styles.subtitle}>Crea una cuenta usando tu cuenta de Google</Text>

			{isLoading.institutions ? (
				<ActivityIndicator size="large" color="#F97316" style={styles.loadingIndicator} />
			) : (
				<Picker
					selectedValue={institution}
					onValueChange={(itemValue: Institution | null) =>
						itemValue?.id === undefined ? setInstitution(null) : setInstitution(itemValue)
					}
					style={styles.picker}
				>
					<Picker.Item key={0} label="Seleccionar Institución" value={{}} />
					{institutions?.map((institution) => (
						<Picker.Item key={institution.id} label={institution.name} value={institution} />
					))}
				</Picker>
			)}

			{isLoading.auth ? (
				<ActivityIndicator size="large" color="#F97316" style={styles.loadingIndicator} />
			) : (
				<GoogleSigninButton
					disabled={!institution}
					style={styles.googleButton}
					size={GoogleSigninButton.Size.Wide}
					color={GoogleSigninButton.Color.Dark}
					onPress={handleGoogleSignUp}
				/>
			)}

			<Text style={styles.disclaimer}>Tu información se mantendrá privada y segura.</Text>
			<Text style={styles.registerPrompt}>¿Ya tienes una cuenta?</Text>
			<Link
				to="/"
				children={
					<Text style={styles.registerLink} onPress={() => navigation.navigate('Login' as never)}>
						Iniciar Sesión Ahora
					</Text>
				}
			/>
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
	picker: {
		width: '80%',
		height: 50,
		color: '#FFFFFF',
		backgroundColor: '#1F2937',
		borderRadius: 8,
		marginBottom: 20,
		paddingHorizontal: 10,
		borderColor: '#F97316',
		borderWidth: 1,
	},
	loadingIndicator: {
		marginVertical: 20,
	},
});
