import {InstitutionsProvider} from '@/provider/Institution.provider';
import {Institution} from '@/types/Institution';
import {create} from 'zustand';

interface InstitutionsStoreState {
	institution: Institution | null;
	institutions: Institution[] | null;
	setInstitution: (institution: Institution) => Promise<void>;

	getInstitutions: (active: string) => Promise<void>;
}

const useInstitutionsStore = create<InstitutionsStoreState>((set) => ({
	institution: null,
	institutions: null,
	setInstitution: async (institution: Institution) => {
		set((state) => ({...state, institution: institution}));
	},
	getInstitutions: async (active: string) => {
		const institutions = await InstitutionsProvider.getInstitutions(active);
		set((state) => ({...state, institutions: institutions}));
	},
}));

export default useInstitutionsStore;
