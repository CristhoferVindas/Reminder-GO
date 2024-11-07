import React, {useEffect, useState} from 'react';
import {View, Text, Switch, FlatList, StyleSheet} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import useActivitiesStore from '@/store/activities.store';
import {Activity} from '@/types/Activity.type';
import useClassificationsStore from '@/store/classification.store';
import {convertDateToDMYString, convertDateToTimeString} from '@/functions/handleTime';
import {StackNavigationProp} from '@react-navigation/stack';
import {RefreshControl, TouchableOpacity} from 'react-native-gesture-handler';
import {CategoryStackParamList} from '@/app/stackCategory/StackCategory';
import {MaterialIcons} from '@expo/vector-icons';
import useUserActivitiesStore from '@/store/userActivities.store';
import useUsersStore from '@/store/user.store';
import {registerForPushNotificationsAsync} from '@/notifications/PushNotifications';
import {User} from '@/types/User.type';

type ActivitiesScreenNavigationProp = StackNavigationProp<
	CategoryStackParamList,
	'ActivitiesDetails'
>;

type Props = {
	navigation: ActivitiesScreenNavigationProp;
};

const Activities = ({navigation}: Props) => {
	const [switchStates, setSwitchStates] = useState<{[key: string]: boolean}>({});
	const [refreshing, setRefreshing] = useState(false);

	const activitiesByCategory = useActivitiesStore((state) => state.activitiesByCategory);
	const getActivitiesByCategoryID = useActivitiesStore((state) => state.getActivitiesByCategoryID);
	const getUserActivities = useUserActivitiesStore((state) => state.getUserActivities);
	const userActivities = useUserActivitiesStore((state) => state.userActivities);
	const createUserActivity = useUserActivitiesStore((state) => state.createUserActivity);
	const deleteUserActivity = useUserActivitiesStore((state) => state.deleteUserActivity);

	const user = useUsersStore((state) => state.user);

	const classifications = useClassificationsStore((state) => state.classifications);
	const getClassifications = useClassificationsStore((state) => state.getClassifications);

	const route = useRoute<RouteProp<CategoryStackParamList, 'Activities'>>();
	const {categoryId} = route.params;
	const [isFavorite, setIsFavorite] = useState(false);

	const handleFavoritePress = (userActivity: Activity) => {
		if (isFavorite) {
			deleteUserActivity(userActivity?.id?.toString() || '');
		} else {
			createUserActivity({
				users: user || ({} as User),
				activities: userActivity,
				activity_id: userActivity.id,
				user_id: user?.id || 0,
				classification_id: 0,
				filed: 'S',
			});
			scheduleActivity(userActivity);
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
		getUserActivities(user?.id?.toString() || '');
		getActivitiesByCategoryID(categoryId?.id || 0);
		getClassifications('A');
	}, [categoryId]);

	useEffect(() => {
		if (classifications) {
			const initialSwitchStates = classifications.reduce((acc, classification) => {
				acc[classification.id || 0] = true;
				return acc;
			}, {} as {[key: string]: boolean});
			setSwitchStates(initialSwitchStates);
		}
	}, [classifications]);

	const toggleSwitch = (classificationId: string) => {
		setSwitchStates((prevState) => ({
			...prevState,
			[classificationId]: !prevState[classificationId],
		}));
	};

	const onRefresh = () => {
		setRefreshing(true);
		getActivitiesByCategoryID(categoryId?.id || 0);
		getClassifications('A');
		setRefreshing(false);
	};

	const handleActivityPress = (activity: Activity) => {
		navigation.navigate('ActivitiesDetails', {activityId: activity});
	};

	const renderActivity = ({item}: {item: Activity}) => {
		return (
			<TouchableOpacity onPress={() => handleActivityPress(item)}>
				<View style={styles.activityContainer}>
					<View style={[styles.iconContainer]} />
					<View style={styles.textContainer}>
						<Text style={styles.activityTitle}>{item.name}</Text>
						<Text style={styles.activityDetails}>
							{convertDateToDMYString(new Date(item.date))} - {convertDateToTimeString(new Date(item.time))}
						</Text>
					</View>
					<TouchableOpacity style={styles.favoriteIconContainer} onPress={() => handleFavoritePress(item)}>
						<MaterialIcons
							name={
								userActivities?.find((userActivity) => userActivity.activities.id == item.id)
									? 'favorite'
									: 'favorite-border'
							}
							size={24}
							color={
								userActivities?.find((userActivity) => userActivity.activities.id == item.id) ? '#F97316' : 'gray'
							}
						/>
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.filtersContainer}>
				{classifications?.map((classification) => (
					<View key={classification.id} style={styles.filterItem}>
						<Text style={styles.filterLabel}>{classification.name}</Text>
						<Switch
							value={switchStates[classification.id || 0]}
							onValueChange={() => toggleSwitch(classification.id?.toString() || '')}
							thumbColor={switchStates[classification.id || 0] ? classification.color : '#f4f3f4'}
							trackColor={{false: '#767577', true: '#767577'}}
						/>
					</View>
				))}
			</View>

			<View style={styles.activitiesContainer}>
				<Text style={styles.activitiesTitle}>Actividades</Text>
				{activitiesByCategory && activitiesByCategory.length > 0 ? (
					<FlatList
						data={activitiesByCategory}
						renderItem={renderActivity}
						keyExtractor={(item) => String(item.id)}
						refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					/>
				) : (
					<Text style={styles.noActivitiesText}>No hay actividades disponibles</Text>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#374151',
	},
	filtersContainer: {
		marginBottom: 20,
	},
	filterItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 1,
		backgroundColor: '#333',
		padding: 5,
		borderRadius: 10,
	},
	filterLabel: {
		fontSize: 16,
		color: '#fff',
	},
	activitiesContainer: {
		flex: 1,
		marginTop: 10,
	},
	activitiesTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
		color: '#fff',
	},
	activityContainer: {
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#1e293b',
		borderRadius: 10,
		marginBottom: 10,
	},
	iconContainer: {
		width: 15,
		height: 60,
		borderTopStartRadius: 10,
		borderBottomStartRadius: 10,
		marginRight: 10,
	},
	textContainer: {
		flex: 1,
	},
	activityTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#fff',
	},
	activityDetails: {
		fontSize: 14,
		color: '#fff',
	},
	noActivitiesText: {
		fontSize: 16,
		color: '#9CA3AF',
		textAlign: 'center',
		marginTop: 20,
	},

	favoriteIconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		marginRight: 10,
	},
});

export default Activities;
