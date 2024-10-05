import {CategoriesProvider} from '@/provider/Categories.provider';
import {Category} from '@/types/Category.type';
import {create} from 'zustand';

interface CategoriesStoreState {
	category: Category | null;
	categories: Category[] | null;
	getCategories: (active: string) => Promise<void>;
}

const useCategoriesStore = create<CategoriesStoreState>((set) => ({
	category: null,
	categories: null,
	getCategories: async (active: string) => {
		const newCategories = await CategoriesProvider.getCategoriesByStatus(active);
		set((state) => ({...state, categories: newCategories}));
	},
}));

export default useCategoriesStore;
