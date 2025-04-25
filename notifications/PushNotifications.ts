import * as Notifications from 'expo-notifications';
import {useRouter} from 'expo-router';

export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
	const {status} = await Notifications.getPermissionsAsync();
	if (status !== 'granted') {
		const {status: newStatus} = await Notifications.requestPermissionsAsync();
		if (newStatus !== 'granted') {
			alert('No se han concedido permisos para las notificaciones!');
			return undefined;
		}
	}

	const token = (await Notifications.getExpoPushTokenAsync()).data;
	console.log('Token de notificación:', token);
	return token;
}

export function setNotificationListeners() {
	const router = useRouter();

	Notifications.addNotificationResponseReceivedListener((response) => {
		try {
			router.push('/reminder');
		} catch (error) {
			console.error('Error redirigiendo a la pantalla de detalles de la actividad:', error);
		}
	});
}

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});
