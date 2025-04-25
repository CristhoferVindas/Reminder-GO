import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {create} from 'zustand';
type NotificationStore = {
	isNotificationModalVisible: boolean;
	notificationData: FirebaseMessagingTypes.RemoteMessage | null;
	showNotificationModal: (data: FirebaseMessagingTypes.RemoteMessage) => void;
	hideNotificationModal: () => void;
};

const useNotificationStore = create<NotificationStore>((set) => ({
	isNotificationModalVisible: false,
	notificationData: null,
	showNotificationModal: (data) => {
		set({isNotificationModalVisible: true, notificationData: data});
	},
	hideNotificationModal: () => set({isNotificationModalVisible: false, notificationData: null}),
}));

export default useNotificationStore;
