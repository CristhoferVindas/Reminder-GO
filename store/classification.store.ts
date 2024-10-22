import {ClassificationsProvider} from '@/provider/Classifications.provider';
import {Classification} from '@/types/Classification.type';
import {create} from 'zustand';

interface ClassificationsStoreState {
	classification: Classification | null;
	classifications: Classification[] | null;
	getClassifications: (active: string) => Promise<void>;
}

const useClassificationsStore = create<ClassificationsStoreState>((set) => ({
	classification: null,
	classifications: null,
	getClassifications: async (active: string) => {
		const newClassifications = await ClassificationsProvider.getClassificationsByStatus(active);
		set((state) => ({...state, classifications: newClassifications}));
	},
}));

export default useClassificationsStore;
