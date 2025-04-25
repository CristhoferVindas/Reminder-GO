import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {CalendarStackParamList} from '@/app/stackCalendar/StackCalendar';
import {StackNavigationProp} from '@react-navigation/stack';
import {useRoute, RouteProp} from '@react-navigation/native';
import useActivitiesStore from '@/store/activities.store';
import useCategoriesStore from '@/store/categories.store';
import {Activity} from '@/types/Activity.type';
import {convertDateToDMYString, convertDateToTimeString} from '@/functions/handleTime';
import useUserActivitiesStore from '@/store/userActivities.store';
import useUsersStore from '@/store/user.store';
import {User} from '@/types/User.type';
import CategoryFilterSwitch from '../filters/CategoryFilterSwitch';
import {Category} from '@/types/Category.type';

type CalendarScreenNavigationProp = StackNavigationProp<
	CalendarStackParamList,
	'CalendarActivities'
>;

type Props = {
	navigation: CalendarScreenNavigationProp;
};

const CalendarActivities = ({navigation}: Props) => {
	const getActivitiesByDate = useActivitiesStore((state) => state.getActivitiesByDate);
	const activitiesByDate = useActivitiesStore((state) => state.activitiesByDate);

	const categories = useCategoriesStore((state) => state.categories);
	const getCategories = useCategoriesStore((state) => state.getCategories);

	const route = useRoute<RouteProp<CalendarStackParamList, 'CalendarActivities'>>();
	const {date} = route.params;

	const userActivities = useUserActivitiesStore((state) => state.userActivities);
	const createUserActivity = useUserActivitiesStore((state) => state.createUserActivity);
	const deleteUserActivity = useUserActivitiesStore((state) => state.deleteUserActivity);

	const user = useUsersStore((state) => state.user);
	const [switchStates, setSwitchStates] = useState<{[key: string]: boolean}>({});

	useEffect(() => {
		getActivitiesByDate(new Date(date), user?.institutions?.id ? user.institutions.id.toString() : '');
		if (user?.institutions?.id) {
			getCategories('A', user.institutions.id.toString());
		}
	}, [date]);

	useEffect(() => {
		if (categories) {
			const initialSwitchStates = categories.reduce((acc, category) => {
				acc[category.id || 0] = false;
				return acc;
			}, {} as {[key: string]: boolean});
			setSwitchStates(initialSwitchStates);
		}
	}, [categories]);

	const toggleSwitch = (categoryId: string) => {
		setSwitchStates((prevState) => ({
			...prevState,
			[categoryId]: !prevState[categoryId],
		}));
	};

	const handleFavoritePress = (userActivity: Activity) => {
		const isFavorite = userActivities?.find((activity) => activity.activities.id === userActivity.id);
		if (isFavorite) {
			deleteUserActivity(userActivity.id.toString());
		} else {
			createUserActivity({
				users: user || ({} as User),
				activities: userActivity,
				activity_id: userActivity.id,
				user_id: user?.id || 0,
				classification_id: 0,
				filed: 'S',
			});
		}
	};

	const handleActivityPress = (activity: Activity) => {
		navigation.navigate('ActivitiesDetails', {activityId: activity});
	};

	const renderEvent = ({item}: {item: Activity}) => (
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

	const filteredActivities = activitiesByDate?.filter((activity) => {
		if (activity.categories) {
			return switchStates[activity.categories.id || 0];
		}
		return false;
	});

	const displayedActivities = Object.values(switchStates).every((state) => !state)
		? activitiesByDate
		: filteredActivities;

	return (
		<View style={styles.container}>
			<Text style={styles.header}>{convertDateToDMYString(new Date(date))}</Text>

			<CategoryFilterSwitch
				onClearFilters={() => { }}
				categories={categories || ([] as Category[])}
				switchStates={switchStates}
				onToggleSwitch={toggleSwitch}
			/>

			<FlatList
				data={displayedActivities}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderEvent}
				contentContainerStyle={styles.list}
				ListEmptyComponent={<Text style={{color: '#fff'}}>No hay actividades</Text>}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#374151',
		paddingHorizontal: 20,
		paddingTop: 40,
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		textAlign: 'center',
		color: '#ffff',
	},
	list: {
		paddingBottom: 20,
	},
	activitiesContainer: {
		flex: 1,
		marginTop: 10,
	},
	activityContainer: {
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#1e293b',
		borderRadius: 10,
		marginBottom: 10,
	},
	textContainer: {
		flex: 1,
	},
	activityTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#ffff',
	},
	activityDetails: {
		fontSize: 14,
		color: '#ffff',
	},
	favoriteIconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		marginRight: 10,
	},
	iconContainer: {
		width: 15,
		height: 60,
		borderTopStartRadius: 10,
		borderBottomStartRadius: 10,
		marginRight: 10,
	},
});

export default CalendarActivities;
