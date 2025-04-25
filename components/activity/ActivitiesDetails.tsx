import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {CategoryStackParamList} from '@/app/stackCategory/StackCategory';
import useUserActivitiesStore from '@/store/userActivities.store';
import useUsersStore from '@/store/user.store';
import {User} from '@/types/User.type';
import {registerForPushNotificationsAsync} from '@/notifications/PushNotifications';
import {Activity} from '@/types/Activity.type';
import MapScreen from '../Maps/MapView';

type ActivitiesDetailsRouteProp = RouteProp<CategoryStackParamList, 'ActivitiesDetails'>;

export const ActivitiesDetails = () => {
	const route = useRoute<ActivitiesDetailsRouteProp>();
	const {activityId} = route.params;
	const [latitude, longitude] = activityId.location.split(' ').map(Number);
	const userActivities = useUserActivitiesStore((state) => state.userActivities);
	const userActivity = useUserActivitiesStore((state) => state.userActivity);
	const setUserActivity = useUserActivitiesStore((state) => state.setUserActivity);
	const createUserActivity = useUserActivitiesStore((state) => state.createUserActivity);
	const deleteUserActivity = useUserActivitiesStore((state) => state.deleteUserActivity);
	const user = useUsersStore((state) => state.user);

	const [isFavorite, setIsFavorite] = useState(false);

	const handleFavoritePress = () => {
		if (isFavorite) {
			deleteUserActivity(userActivity?.id?.toString() || '');
		} else {
			createUserActivity({
				users: user || ({} as User),
				activities: activityId,
				activity_id: activityId.id,
				user_id: user?.id || 0,
				classification_id: 0,
				filed: 'S',
			});
			scheduleActivity(activityId);
		}
	};
	const scheduleActivity = async (activity: Activity) => {
		try {
			const expoPushToken = await registerForPushNotificationsAsync();
			const scheduledDate = activity.date;

			await fetch(`http://${process.env.EXPO_PUBLIC_DIRECCIONIP as string}:3000/api/notifications`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					expoPushToken,
					title: activity.name,
					body: activity.description,
					scheduledDate,
				}),
			});
		} catch (error) {
			console.error('Error enviando notificación:', error);
		}
	};
	useEffect(() => {
		const isActivityFavorite = userActivities?.find(
			(activity) => activity.activities.id === activityId.id
		);
		setIsFavorite(!!isActivityFavorite);
		if (isActivityFavorite) {
			setUserActivity(isActivityFavorite);
		}
	}, [userActivities]);

	const formattedDate = new Date(activityId.date).toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	const formattedTime = new Date(activityId.time).toLocaleTimeString('es-ES', {
		hour: '2-digit',
		minute: '2-digit',
	});

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Text style={styles.title}>{activityId.name}</Text>
				<Text style={styles.description}>{activityId.description}</Text>
				<Text style={styles.category}>Categoría: {activityId.categories.name}</Text>
				<Text style={styles.date}>Fecha: {formattedDate}</Text>
				<Text style={styles.time}>Hora: {formattedTime}</Text>

				<MapScreen key={activityId.id} latitude={latitude} longitude={longitude} />

				<TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
					<Text style={styles.favoriteText}>
						{isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1F2937',
		padding: 20,
	},
	card: {
		backgroundColor: '#2D3748',
		borderRadius: 12,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 8,
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
		marginBottom: 10,
		color: '#F3F4F6',
	},
	description: {
		fontSize: 16,
		marginBottom: 10,
		color: '#D1D5DB',
		lineHeight: 22,
	},
	category: {
		fontSize: 14,
		color: '#A0AEC0',
		marginBottom: 10,
	},
	date: {
		fontSize: 16,
		color: '#D1D5DB',
		fontWeight: '500',
		marginBottom: 5,
	},
	time: {
		fontSize: 16,
		color: '#D1D5DB',
		fontWeight: '500',
		marginBottom: 15,
	},
	favoriteButton: {
		marginVertical: 20,
		backgroundColor: '#F97316',
		paddingVertical: 14,
		borderRadius: 10,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 6,
	},
	favoriteText: {
		color: '#FFFFFF',
		fontWeight: '700',
		fontSize: 16,
	},
});

export default ActivitiesDetails;
