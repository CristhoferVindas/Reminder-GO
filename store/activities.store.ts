import {ActivitiesProvider} from '@/provider/Activities.provider';
import {Activity} from '@/types/Activity.type';
import {create} from 'zustand';

interface ActivitiesStoreState {
	activity: Activity | null;
	activities: Activity[] | null;
	activitiesByDate: Activity[] | null;
	activitiesByCategory: Activity[] | null;

	getActivitiesByCategoryID: (category_id: number) => Promise<void>;
	getActivitiesByDate: (date: Date) => Promise<void>;
}

const useActivitiesStore = create<ActivitiesStoreState>((set) => ({
	activity: null,
	activities: null,
	activitiesByCategory: null,
	activitiesByDate: null,
	getActivitiesByCategoryID: async (category_id: number) => {
		const newActivities = await ActivitiesProvider.getActivitiesByCategoryID(category_id);
		set((state) => ({...state, activitiesByCategory: newActivities}));
	},
	getActivitiesByDate: async (date: Date) => {
		const newActivities = await ActivitiesProvider.getActivitiesByDate(date);
		set((state) => ({...state, activitiesByDate: newActivities}));
	},
}));

export default useActivitiesStore;
