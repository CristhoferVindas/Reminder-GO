import {Institution} from '@/types/Institution';
import {create} from 'zustand';

interface InstitutionsStoreState {
	institution: Institution | null;
	institutions: Institution[] | null;
	setInstitutions: (institution: Institution) => Promise<void>;
}

const useInstitutionsStore = create<InstitutionsStoreState>((set) => ({
	institution: null,
	institutions: null,
	setInstitutions: async (institution: Institution) => {
		set((state) => ({...state, institution: institution}));
	},
}));

export default useInstitutionsStore;
