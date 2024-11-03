import {create} from 'zustand';
import {InstitutionUserRoleProvider} from '@/provider/InstitutionUserRole.provider';
import {Institutions_x_users_x_roles} from '@/types/InstitutionUserRole';

interface Institutions_x_users_x_rolesState {
	institutions_x_users_x_roles: Institutions_x_users_x_roles[];
	institution_x_users_x_roles: Institutions_x_users_x_roles | null;

	getInstitutions_x_users_x_rolesByIdUser: (idUser: string) => Promise<void>;
	getInstitutions_x_users_x_rolesByEmails: (idUser: string) => Promise<void>;
}
const useInstitutions_x_users_x_rolesStore = create<Institutions_x_users_x_rolesState>((set) => ({
	institutions_x_users_x_roles: [],
	institution_x_users_x_roles: null,

	getInstitutions_x_users_x_rolesByIdUser: async (idUser: string) => {
		const newServiceInstitutions_x_users_x_roles =
			await InstitutionUserRoleProvider.getInstitutions_x_users_x_rolesByIdUser(idUser);
		set((state) => ({...state, institutions_x_users_x_roles: newServiceInstitutions_x_users_x_roles}));
	},
	getInstitutions_x_users_x_rolesByEmails: async (email: string) => {
		const newServiceInstitutions_x_users_x_roles =
			await InstitutionUserRoleProvider.getInstitutions_x_users_x_rolesByEmail(email);
		set((state) => ({...state, institution_x_users_x_roles: newServiceInstitutions_x_users_x_roles}));
	},
}));
export default useInstitutions_x_users_x_rolesStore;
