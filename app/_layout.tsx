import useUsersStore from '@/store/user.store';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
	registerForPushNotificationsAsync,
	setNotificationListeners,
} from '@/notifications/PushNotifications';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import useNotificationStore from '@/store/notification.store';


export default function RootLayout() {

	const user = useUsersStore((state) => state.user);
	const showNotificationModal = useNotificationStore((state) => (state.showNotificationModal));

	const [renderKey, setRenderKey] = useState(0);
	const router = useRouter();

	useEffect(() => {
		if (user == null) {
			router.navigate('/login');
		} else {
			setRenderKey((prev) => prev + 1);
			if (user.name == 'salir') {
				router.replace('/');
				return;
			}
			if (user.institutions?.id === undefined || user.roles?.id === 2) {
				router.navigate('/waitingScreen');
			}
			if (user.institutions?.id === undefined || user.roles?.id === 2) { }
			else {
				router.replace('/(tabs)/');
			}
		}
	}, [user]);

	useEffect(() => {
		const initializeNotifications = async () => {
			await registerForPushNotificationsAsync();
			setNotificationListeners();
		};
		const onMessageReceivedInBackground = async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
			showNotificationModal(remoteMessage);
		};
		AppRegistry.registerHeadlessTask('ReactNativeFirebaseMessagingHeadlessTask', () => onMessageReceivedInBackground);

		console.log("Se inicializan las notificaciones");

		initializeNotifications();
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
