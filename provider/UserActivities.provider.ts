import {UserActivity} from '@/types/UserActivity';

async function getUsersActivitiesByUserID(userId: string) {
	try {
		const ip = process.env.EXPO_PUBLIC_DIRECCIONIP as string;
		const response = await fetch(
			`http://${process.env.EXPO_PUBLIC_DIRECCIONIP as string}:3000/api/user_activities/userId/${userId}`
		);
		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.statusText}`);
		}
		const data = await response.json();

		return data as UserActivity[];
	} catch (error) {
		console.error('Error obteniendo las categorías por estado:', error);
		throw error;
	}
}

async function createUserActivity(userActivity: UserActivity) {
	try {
		const response = await fetch(
			`http://${process.env.EXPO_PUBLIC_DIRECCIONIP as string}:3000/api/user_activities/`,
			{
				method: 'POST',
				body: JSON.stringify(userActivity),
			}
		);

		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.statusText}`);
		}

		const data = await response.json();
		return data as UserActivity;
	} catch (error) {
		console.error('Error obteniendo las Actividades por estado:', error);
		throw error;
	}
}
async function deleteUserActivity(id: string) {
	try {
		const response = await fetch(
			`http://${process.env.EXPO_PUBLIC_DIRECCIONIP as string}:3000/api/user_activities/`,
			{
				method: 'DELETE',
				body: JSON.stringify(id),
			}
		);

		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.statusText}`);
		}

		const data = await response.json();
		return data as UserActivity;
	} catch (error) {
		console.error(`Error Eliminando la actividad: con id: ${id}`, error);
		throw error;
	}
}
export const UsersActivitiesProvider = {
	deleteUserActivity,
	createUserActivity,
	getUsersActivitiesByUserID,
};
