import {User} from '@/types/User.type';

async function getUsersByEmail(email: string) {
	try {
		const response = await fetch(
			`http://${process.env.EXPO_PUBLIC_DIRECCIONIP as string}:3000/api/users/mail/${email}`
		);
		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.statusText}`);
		}
		const data = await response.json();

		return data as User;
	} catch (error) {
		console.error('Error obteniendo los usuarios:', error);
		throw error;
	}
}
async function createUser(user: User) {
	try {
		const response = await fetch(
			`http://${process.env.EXPO_PUBLIC_DIRECCIONIP as string}:3000/api/users/`,
			{
				method: 'POST',
				body: JSON.stringify(user),
			}
		);

		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.statusText}`);
		}

		const data = await response.json();
		return data as User;
	} catch (error) {
		console.error('Error obteniendo las Actividades por estado:', error);
		throw error;
	}
}
export const UsersProvider = {
	getUsersByEmail,
	createUser,
};
