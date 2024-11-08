import {ActivitiesProvider} from '@/provider/Activities.provider';
import {Activity} from '@/types/Activity.type';
import {create} from 'zustand';

interface ActivitiesStoreState {
	activity: Activity | null;
	activities: Activity[] | null;
	activitiesByDate: Activity[] | null;
	activitiesByCategory: Activity[] | null;
	activitiesCalendar: Activity[] | null;

	getActivitiesByCategoryID: (category_id: string, institutionId: string) => Promise<void>;
	getActivitiesByDate: (date: Date, institutionId: string) => Promise<void>;
	getActivitiesByInstitutionID: (active: string, institution_id: string) => Promise<void>;
}

const useActivitiesStore = create<ActivitiesStoreState>((set) => ({
	activity: null,
	activities: null,
	activitiesByCategory: null,
	activitiesByDate: null,
	activitiesCalendar: null,

	getActivitiesByCategoryID: async (category_id: string, institutionId: string) => {
		const newActivities = await ActivitiesProvider.getActivitiesByCategoryID(
			category_id,
			institutionId
		);
		set((state) => ({...state, activitiesByCategory: newActivities}));
	},
	getActivitiesByInstitutionID: async (active: string, institution_id: string) => {
		const newActivities = await ActivitiesProvider.getActivitiesByInstitutionID(active, institution_id);
		set((state) => ({...state, activitiesCalendar: newActivities}));
	},
	getActivitiesByDate: async (date: Date, institutionId: string) => {
		const newActivities = await ActivitiesProvider.getActivitiesByDate(date, institutionId);
		set((state) => ({...state, activitiesByDate: newActivities}));
	},
}));

export default useActivitiesStore;
