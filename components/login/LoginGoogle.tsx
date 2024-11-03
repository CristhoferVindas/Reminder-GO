import { useEffect, useState } from 'react';
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from '@react-native-google-signin/google-signin';
import {getAuth, GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import {Alert, View} from 'react-native';
import {firebaseConfig} from '@/firebaseConfig';
import {initializeApp} from 'firebase/app';
import useUsersStore from '@/store/user.store';
import {User} from '@/types/User.type';
import useInstitutions_x_users_x_rolesStore from '@/store/institutionsUsersRoles.store';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function AuthComponent() {
	const [user, setUser] = useState<User | null | undefined>(null);
	const setUserInStore = useUsersStore((state) => state.setUser);
	const createUser = useUsersStore((state) => state.createUser);
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
		if (insti_x_users_x_roles?.users?.id == undefined && user) {
			createUser(user);
		}
		if (user) {
			setUserInStore({
				name: insti_x_users_x_roles?.users?.name || '',
				mail: insti_x_users_x_roles?.users?.mail || '',
				image: insti_x_users_x_roles?.users.image || '',
				first_last_name: insti_x_users_x_roles?.users.first_last_name || '',
				second_last_name: insti_x_users_x_roles?.users.second_last_name || '',
				id: insti_x_users_x_roles?.users?.id,
				institutions: insti_x_users_x_roles?.institutions,
				roles: insti_x_users_x_roles?.roles,
			});
			Alert.alert('Inicio de sesión exitoso', `Bienvenido ${user?.name}`);
		}
	}, [user]);

	useEffect(() => {
		if (insti_x_users_x_roles) {
			setUserInStore({
				name: insti_x_users_x_roles.users?.name || '',
				mail: insti_x_users_x_roles.users?.mail || '',
				image: '',
				first_last_name: '',
				second_last_name: '',
				id: insti_x_users_x_roles?.users?.id,
				institutions: insti_x_users_x_roles?.institutions,
				roles: insti_x_users_x_roles?.roles,
			});
			Alert.alert('Inicio de sesión exitoso', `Bienvenido ${user?.name}`);
		}
	}, [insti_x_users_x_roles]);

	const handleGoogleSignIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			const {data} = userInfo;
			const googleCredential = GoogleAuthProvider.credential(data?.idToken);
			const userCredential = await signInWithCredential(auth, googleCredential);
			const loggedInUser = userCredential.user;
			await getInstitutions_x_users_x_rolesByEmails(loggedInUser.email || '');
			const nameParts = data?.user?.name?.split(' ') || [];
			const name = nameParts[0] || '';
			const first_last_name = nameParts[1] || '';
			const second_last_name = nameParts[2] || '';
			const newUser: User = {
				name: name,
				first_last_name: first_last_name,
				second_last_name: second_last_name,
				mail: data?.user?.email || '',
				image: data?.user?.photo || '',
				institutions: insti_x_users_x_roles?.institutions,
				roles: insti_x_users_x_roles?.roles,
			};
			setUser(newUser);
		} catch (error: any) {
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
		}
	};

	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<GoogleSigninButton
				size={GoogleSigninButton.Size.Wide}
				color={GoogleSigninButton.Color.Dark}
				onPress={handleGoogleSignIn}
			/>
		</View>
	);
}
