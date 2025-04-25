import {Category} from '@/types/Category.type';

async function getCategoriesByStatusAndInstitutionID(active: string, institutionId: string) {
	try {
		if (!active || !institutionId) {
			throw new Error('Los parámetros active e institutionId son obligatorios.');
		}

		const ip = process.env.EXPO_PUBLIC_DIRECCIONIP;
		if (!ip) {
			throw new Error('La variable de entorno EXPO_PUBLIC_DIRECCIONIP no está definida.');
		}
		const url = `http://${encodeURIComponent(ip)}:3000/api/categories?active=${encodeURIComponent(
			active
		)}&institution_id=${encodeURIComponent(institutionId)}`;

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
		}
		const data = await response.json();
		return data as Category[];
	} catch (error) {
		console.error('Error obteniendo las categorías por estado:', error);
		throw error;
	}
}

export const CategoriesProvider = {
	getCategoriesByStatusAndInstitutionID,
};
