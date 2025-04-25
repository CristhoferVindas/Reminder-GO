import {Category} from './Category.type';
import {Classification} from './Classification.type';

export type Activity = {
	id: number;
	name: string;
	description: string;
	location: string;
	date: Date;
	time: Date;
	active: String;
	global: String;
	category_id: number;
	user_id: number;
	categories: Category;
	classifications: Classification;
};
