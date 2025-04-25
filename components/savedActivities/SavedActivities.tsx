import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Activity} from '@/types/Activity.type';
import {convertDateToDMYString, convertDateToTimeString} from '@/functions/handleTime';
import useUsersStore from '@/store/user.store';
import useUserActivitiesStore from '@/store/userActivities.store';
import {SavedActivitiesDetailsStackParamList} from '@/app/stackSavedActivities/StackSavedActivities';
import {MaterialIcons} from '@expo/vector-icons';
import {UserActivity} from '@/types/UserActivity';
import useCategoriesStore from '@/store/categories.store';
import CategoryFilterDropdown from '../filters/CategoryFilterSwitch';

type ActivitiesScreenNavigationProp = StackNavigationProp<
	SavedActivitiesDetailsStackParamList,
	'ActivitiesDetails'
>;

type Props = {
	navigation: ActivitiesScreenNavigationProp;
};

const SavedActivities = ({navigation}: Props) => {
	const [activities, setActivities] = useState<Activity[]>([]);
	const [refreshing, setRefreshing] = useState(false);
	const [switchStates, setSwitchStates] = useState<{[key: string]: boolean}>({});

	const user = useUsersStore((state) => state.user);
	const getUserActivities = useUserActivitiesStore((state) => state.getUserActivities);
	const userActivities = useUserActivitiesStore((state) => state.userActivities);
	const deleteUserActivity = useUserActivitiesStore((state) => state.deleteUserActivity);

	const categories = useCategoriesStore((state) => state.categories);
	const getCategories = useCategoriesStore((state) => state.getCategories);

	useEffect(() => {
		if (user?.id) {
			getUserActivities(user.id.toString(), user?.institutions?.id?.toString() || '');
		}
		if (user?.institutions?.id) {
			getCategories('A', user.institutions.id.toString());
		}
	}, [user]);

	useEffect(() => {
		if (categories) {
			const initialSwitchStates = categories.reduce((acc, category) => {
				acc[category.id || 0] = false;
				return acc;
			}, {} as {[key: string]: boolean});
			setSwitchStates(initialSwitchStates);
		}
	}, [categories]);

	useEffect(() => {
		applyFilters();
	}, [userActivities, switchStates]);

	const toggleSwitch = (categoryId: string) => {
		setSwitchStates((prevState) => ({
			...prevState,
			[categoryId]: !prevState[categoryId],
		}));
	};

	const applyFilters = () => {
		const activeFilters = Object.keys(switchStates).filter((key) => switchStates[key]);
		const filteredActivities =
			activeFilters.length === 0
				? userActivities?.map((userActivity) => userActivity.activities) || []
				: userActivities
					?.filter((userActivity) =>
						activeFilters.includes(userActivity.activities.category_id?.toString() || '')
					)
					.map((userActivity) => userActivity.activities) || [];

		setActivities(filteredActivities);
	};

	const onClearFilters = () => {
		setActivities(userActivities?.map((userActivity) => userActivity.activities) || []);
	};

	const onRefresh = async () => {
		setRefreshing(true);
		if (user?.id) {
			await getUserActivities(user.id.toString(), user?.institutions?.id?.toString() || '');
		}
		setRefreshing(false);
	};

	const handleFavoritePress = (userActivity: UserActivity) => {
		deleteUserActivity(userActivity?.id?.toString() || '');
	};

	const handleActivityPress = (activity: Activity) => {
		navigation.navigate('ActivitiesDetails', {activityId: activity});
	};

	const renderActivity = ({item}: {item: Activity}) => {
		const userActivity = userActivities?.find((userActivity) => userActivity.activities.id === item.id);
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
					<TouchableOpacity
						style={styles.favoriteIconContainer}
						onPress={() => handleFavoritePress(userActivity || ({} as UserActivity))}
					>
						<MaterialIcons name="delete-forever" size={24} color="#f45d" />
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			<CategoryFilterDropdown
				categories={categories || []}
				switchStates={switchStates}
				onToggleSwitch={toggleSwitch}
				onClearFilters={onClearFilters}
			/>

			<View style={styles.activitiesContainer}>
				<Text style={styles.activitiesTitle}>Actividades Guardadas</Text>
				<FlatList
					data={activities}
					renderItem={renderActivity}
					keyExtractor={(item, index) => `${item.id}-${index}`}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					ListEmptyComponent={<Text style={{color: '#fff'}}>No hay actividades</Text>}
				/>
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
	favoriteIconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		marginRight: 10,
	},
});

export default SavedActivities;
