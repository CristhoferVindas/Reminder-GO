import * as Notifications from 'expo-notifications';
import {getPermissionsAsync, requestPermissionsAsync} from 'expo-notifications';

export function setNotificationListeners() {
	Notifications.addNotificationReceivedListener((notification) => {
		console.log('Notificación recibida en primer plano:', notification);
	});

	Notifications.addNotificationResponseReceivedListener((response) => {
		console.log('Notificación abierta por el usuario:', response);
	});
}
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
	const {status} = await getPermissionsAsync();
	if (status !== 'granted') {
		const {status: newStatus} = await requestPermissionsAsync();
		if (newStatus !== 'granted') {
			alert('No se han concedido permisos para las notificaciones!');
			return undefined;
		}
	}

	const token = (await Notifications.getExpoPushTokenAsync()).data;
	console.log('Token de notificación:', token);
	return token;
}
