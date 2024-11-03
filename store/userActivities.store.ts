import {UsersActivitiesProvider} from '@/provider/UserActivities.provider';
import {UserActivity} from '@/types/UserActivity';
import {create} from 'zustand';

interface UserActivitiesStoreState {
	userActivity: UserActivity | null;
	userActivities: UserActivity[] | null;
	getUserActivities: (userID: string) => Promise<void>;
	createUserActivity: (userActivity: UserActivity) => Promise<void>;
	deleteUserActivity: (userActivityID: string) => Promise<void>;
	setUserActivity: (userActivity: UserActivity) => Promise<void>;
}

const useUserActivitiesStore = create<UserActivitiesStoreState>((set) => ({
	userActivity: null,
	userActivities: null,

	createUserActivity: async (userActivity: UserActivity) => {
		const newUserActivity = await UsersActivitiesProvider.createUserActivity(userActivity);
		set((state) => ({
			...state,
			userActivity: newUserActivity,
			userActivities: [...(state.userActivities || []), newUserActivity],
		}));
	},

	deleteUserActivity: async (userActivityID: string) => {
		const deletedUserActivity = await UsersActivitiesProvider.deleteUserActivity(userActivityID);
		if (deletedUserActivity) {
			set((state) => ({
				...state,
				userActivities:
					state.userActivities?.filter((activity) => activity.id?.toString() !== userActivityID) || null,
			}));
		}
	},

	getUserActivities: async (userID: string) => {
		const newUserActivities = await UsersActivitiesProvider.getUsersActivitiesByUserID(userID);
		set((state) => ({...state, userActivities: newUserActivities}));
	},
	setUserActivity: async (userActivity: UserActivity) => {
		set((state) => ({...state, userActivity: userActivity}));
	},
}));

export default useUserActivitiesStore;
