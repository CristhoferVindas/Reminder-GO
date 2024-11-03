import {Role} from 'react-native';
import {Institution} from './Institution';

export type User = {
	id?: number | undefined;
	name: string;
	first_last_name: string;
	second_last_name: string;
	mail: string;
	image: string;
	roles?: Role;
	institutions?: Institution;
};
