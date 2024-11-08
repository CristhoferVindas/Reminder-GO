import {UsersProvider} from '@/provider/User.provider';
import {Institution} from '@/types/Institution';
import {User} from '@/types/User.type';
import {create} from 'zustand';

interface UsersStoreState {
	usercreatedSuccessful: User | null;
	user: User | null;
	createUser: (user: User) => Promise<void>;
	getUsersByEmail: (email: string) => Promise<void>;
	setUser: (user: User | null) => Promise<void>;
	setUserInstitution: (institution: Institution | null) => Promise<void>;
}

const useUsersStore = create<UsersStoreState>((set) => ({
	user: null,
	usercreatedSuccessful: null,
	getUsersByEmail: async (email: string) => {
		const users = await UsersProvider.getUsersByEmail(email);
		set({user: users});
	},
	createUser: async (user: User) => {
		const newUser = await UsersProvider.createUser(user);

		set({usercreatedSuccessful: newUser, user: newUser});
	},
	setUser: async (user: User | null) => {
		set({user: user});
	},
	setUserInstitution: async (institution: Institution | null) => {
		set((state) => ({user: {...state.user!, institutions: institution || undefined}}));
	},
}));

export default useUsersStore;
