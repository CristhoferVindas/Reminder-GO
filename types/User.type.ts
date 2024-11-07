import {Institution} from './Institution';
import {Role} from './Role.type';

export type User = {
	id?: number | undefined;
	name: string;
	first_last_name: string;
	second_last_name: string;
	mail: string;
	image: string;
	roles: Role;
	institutions?: Institution;
};
