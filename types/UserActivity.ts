import {Activity} from './Activity.type';
import {User} from './User.type';

export type UserActivity = {
	id?: number | undefined;
	filed: string;
	user_id: number;
	activity_id: number;
	activities: Activity;
	users: User;
	classification_id: number;
};
