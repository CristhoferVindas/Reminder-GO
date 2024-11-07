import {Institution} from '@/types/Institution';
import {User} from '@/types/User.type';
import {Role} from 'react-native';

export type Institutions_x_users_x_roles = {
	id?: number | undefined;
	institutions_id: number | null;
	users_id: number;
	roles_id: number;
	roles: Role | null;
	users: User;
	institutions: Institution;
};
