import {Category} from '@/types/Category.type';

async function getCategoriesByStatus(status: string) {
	try {
		const response = await fetch(`http://192.168.1.12:3000/api/categories/active/${status}`);
		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.statusText}`);
		}
		const data = await response.json();
		return data as Category[];
	} catch (error) {
		console.error('Error obteniendo las categorías por estado:', error);
		throw error;
	}
}
export const CategoriesProvider = {
	getCategoriesByStatus,
};
