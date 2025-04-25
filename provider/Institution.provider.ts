import {Institution} from '@/types/Institution';

async function getInstitutions(active: string) {
	try {
		const response = await fetch(
			`http://${process.env.EXPO_PUBLIC_DIRECCIONIP as string}:3000/api/institutions/active/${active}`
		);
		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.statusText}`);
		}
		const data = await response.json();

		return data as Institution[];
	} catch (error) {
		console.error('Error obteniendo las Actividades por estado:', error);
		throw error;
	}
}

export const InstitutionsProvider = {
	getInstitutions,
};
