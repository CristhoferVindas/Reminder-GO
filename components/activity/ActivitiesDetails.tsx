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

const ActivitiesDetails = () => {
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

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Text style={styles.title}>{activityId.name}</Text>
				<Text style={styles.description}>{activityId.description}</Text>
				<Text style={styles.description}>Categoría: {activityId.categories.name}</Text>

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
		backgroundColor: '#374151',
		padding: 20,
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
		color: 'white',
	},
	card: {
		justifyContent: 'space-between',
		backgroundColor: '#1e293b',
		borderRadius: 10,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
		height: '100%',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
		color: '#fff',
	},
	description: {
		fontSize: 14,
		marginBottom: 20,
		color: '#fff',
	},
	subheader: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#fff',
		marginBottom: 10,
	},
	favoriteButton: {
		margin: 20,
		backgroundColor: '#F97316',
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: 'center',
	},
	favoriteText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default ActivitiesDetails;
