import {UsersProvider} from '@/provider/User.provider';
import {User} from '@/types/User.type';
import {create} from 'zustand';

interface UsersStoreState {
	user: User | null;
	createUser: (user: User) => Promise<void>;
	getUsersByEmail: (email: string) => Promise<void>;
	setUser: (user: User | null) => Promise<void>;
}

const useUsersStore = create<UsersStoreState>((set) => ({
	user: null,
	getUsersByEmail: async (email: string) => {
		const users = await UsersProvider.getUsersByEmail(email);
		set({user: users});
	},
	createUser: async (user: User) => {
		const newUser = await UsersProvider.createUser(user);
		set({user: newUser});
	},
	setUser: async (user: User | null) => {
		set({user: user});
	},
}));

export default useUsersStore;
