import {Activity} from '@/types/Activity.type';

async function getActivitiesByCategoryID(category_id: number) {
	try {
		const response = await fetch(
			`http://${
				process.env.EXPO_PUBLIC_DIRECCIONIP as string
			}:3000/api/activities/byCategory/${category_id}`
		);
		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.statusText}`);
		}
		const data = await response.json();

		return data as Activity[];
	} catch (error) {
		console.error('Error obteniendo las Actividades por estado:', error);
		throw error;
	}
}
async function getActivitiesByDate(date: Date) {
	try {
		const dateString = date.toISOString().split('T')[0];
		const response = await fetch(
			`http://${process.env.EXPO_PUBLIC_DIRECCIONIP as string}:3000/api/activities/byDate/${dateString}`,
			{
				method: 'GET',
			}
		);

		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.statusText}`);
		}
		const data = await response.json();

		return data as Activity[];
	} catch (error) {
		console.error('Error obteniendo las Actividades por estado:', error);
		throw error;
	}
}
export const ActivitiesProvider = {
	getActivitiesByCategoryID,
	getActivitiesByDate,
};
