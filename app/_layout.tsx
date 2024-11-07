import * as SecureStore from 'expo-secure-store';
import useUsersStore from '@/store/user.store';
import {User} from '@/types/User.type';
import {Stack, useRouter} from 'expo-router';
import {useEffect, useState} from 'react';
import {
	registerForPushNotificationsAsync,
	setNotificationListeners,
} from '@/notifications/PushNotifications';

export default function RootLayout() {
	const user = useUsersStore((state) => state.user);
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [renderKey, setRenderKey] = useState(0);
	const router = useRouter();

	const storeUser = async (user: User) => {
		try {
			await SecureStore.setItemAsync('currentUser', JSON.stringify(user));
		} catch (error) {
			console.error('Error guardando el usuario:', error);
		}
	};

	useEffect(() => {
		if (user == null) {
			router.navigate('/');
		} else {
			setCurrentUser(user);
			storeUser(user);
			setRenderKey((prev) => prev + 1);
			if (user?.institutions?.id == undefined || user?.roles?.id == 2) {
				router.navigate('/waitingScreen');
			} else {
				router.replace('/(tabs)/');
			}
		}
	}, [user]);

	useEffect(() => {
		const fetchToken = async () => {
			const token = await registerForPushNotificationsAsync();
			if (token) {
			}
		};

		fetchToken();
		setNotificationListeners();
	}, []);

	return (
		<Stack
			key={renderKey}
			screenOptions={{
				headerStyle: {backgroundColor: '#808080'},
				headerTintColor: '#fff',
				headerShown: false,
			}}
		>
			<Stack.Screen name="(tabs)" options={{}} />
			<Stack.Screen name="ActivitiesDetails" />
		</Stack>
	);
}
