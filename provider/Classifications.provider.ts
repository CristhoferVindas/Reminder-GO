import {Classification} from '@/types/Classification.type';

async function getClassificationsByStatus(status: string) {
	try {
		const response = await fetch(
			`http://${process.env.EXPO_PUBLIC_DIRECCIONIP as string}:3000/api/classifications`
		);
		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.statusText}`);
		}
		const data = await response.json();
		console.log(data);
		return data as Classification[];
	} catch (error) {
		console.error('Error obteniendo las clasificaciones :', error);
		throw error;
	}
}
export const ClassificationsProvider = {
	getClassificationsByStatus,
};
