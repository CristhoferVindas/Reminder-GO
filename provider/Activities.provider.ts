import {Activity} from '@/types/Activity.type';

async function getActivitiesByCategoryID(categoryId: string, institutionId: string) {
	try {
		const response = await fetch(
			`http://${
				process.env.EXPO_PUBLIC_DIRECCIONIP as string
			}:3000/api/activities/byCategory/${categoryId}/${institutionId}`
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
async function getActivitiesByDate(date: Date, institutionId: string) {
	try {
		const dateString = date.toISOString().split('T')[0];
		const response = await fetch(
			`http://${
				process.env.EXPO_PUBLIC_DIRECCIONIP as string
			}:3000/api/activities/byDate/${dateString}/${institutionId}`,
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
async function getActivitiesByInstitutionID(active: string, institutionId: string) {
	try {
		const response = await fetch(
			`http://${
				process.env.EXPO_PUBLIC_DIRECCIONIP as string
			}:3000/api/activities/institution/${active}/${institutionId}`,
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
		console.error('Error obteniendo las Actividades ID de institución:', error);
		throw error;
	}
}
export const ActivitiesProvider = {
	getActivitiesByInstitutionID,
	getActivitiesByCategoryID,
	getActivitiesByDate,
};
