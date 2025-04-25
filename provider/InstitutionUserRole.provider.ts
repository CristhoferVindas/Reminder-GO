import {Institutions_x_users_x_roles} from '@/types/InstitutionUserRole';

async function getInstitutions_x_users_x_rolesByIdUser(idUser: string) {
	try {
		const response = await fetch(
			`http://${
				process.env.EXPO_PUBLIC_DIRECCIONIP as string
			}:3000/api/institutions_X_users_X_roles/${idUser}`
		);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		return data as Institutions_x_users_x_roles[];
	} catch (error) {
		console.error('Error obteniendo las Institutions_x_users_x_roles por id de usuario:', error);
		throw error;
	}
}

async function getInstitutions_x_users_x_rolesByEmail(email: string) {
	try {
		const response = await fetch(
			`http://${
				process.env.EXPO_PUBLIC_DIRECCIONIP as string
			}:3000/api/institutions_X_users_X_roles/email/${email}`
		);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		return data as Institutions_x_users_x_roles;
	} catch (error) {
		console.error('Error obteniendo las Institutions_x_users_x_roles por email:', error);
		throw error;
	}
}
async function createInstitutions_x_users_x_roles(
	institutions_x_users_x_roles: Institutions_x_users_x_roles
) {
	try {
		const response = await fetch(
			`http://${process.env.EXPO_PUBLIC_DIRECCIONIP as string}:3000/api/institutions_X_users_X_roles`,

			{
				method: 'POST',
				body: JSON.stringify(institutions_x_users_x_roles),
			}
		);

		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.statusText}`);
		}

		const data = await response.json();
		return data as Institutions_x_users_x_roles;
	} catch (error) {
		console.error('Error obteniendo las Actividades por estado:', error);
		throw error;
	}
}
export const InstitutionUserRoleProvider = {
	createInstitutions_x_users_x_roles,
	getInstitutions_x_users_x_rolesByIdUser,
	getInstitutions_x_users_x_rolesByEmail,
};
