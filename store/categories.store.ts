import {CategoriesProvider} from '@/provider/Categories.provider';
import {Category} from '@/types/Category.type';
import {create} from 'zustand';

interface CategoriesStoreState {
	category: Category | null;
	categories: Category[] | null;
	getCategories: (status: string, institutionId: string) => Promise<void>;
}

const useCategoriesStore = create<CategoriesStoreState>((set) => ({
	category: null,
	categories: null,
	getCategories: async (status: string, institutionId: string) => {
		const newCategories = await CategoriesProvider.getCategoriesByStatusAndInstitutionID(
			status,
			institutionId
		);
		set((state) => ({...state, categories: newCategories}));
	},
}));

export default useCategoriesStore;
