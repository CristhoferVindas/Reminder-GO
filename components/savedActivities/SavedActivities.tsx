import React, {useEffect, useState} from 'react';
import {
	View,
	Text,
	Switch,
	FlatList,
	StyleSheet,
	RefreshControl,
	TouchableOpacity,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/app/stackCategory/StackCategory';
import {Activity} from '@/types/Activity.type';
import {convertDateToDMYString, convertDateToTimeString} from '@/functions/handleTime';
import useUsersStore from '@/store/user.store';
import useUserActivitiesStore from '@/store/userActivities.store';
import {RootSavedActivitiesDetailsStackParamList} from '@/app/stackSavedActivities/StackSavedActivities';

type ActivitiesScreenNavigationProp = StackNavigationProp<
	RootSavedActivitiesDetailsStackParamList,
	'ActivitiesDetails'
>;

type Props = {
	navigation: ActivitiesScreenNavigationProp;
};

const SavedActivities = ({navigation}: Props) => {
	const [activities, setActivities] = useState<Activity[]>([]);
	const [refreshing, setRefreshing] = useState(false);

	const user = useUsersStore((state) => state.user);
	const getUserActivities = useUserActivitiesStore((state) => state.getUserActivities);
	const userActivities = useUserActivitiesStore((state) => state.userActivities);

	useEffect(() => {
		if (user?.id) {
			getUserActivities(user.id.toString());
		}
	}, [user]);

	useEffect(() => {
		const filteredActivities =
			userActivities?.map((userxactivities) => userxactivities.activities) || [];
		setActivities(filteredActivities);
	}, [userActivities]);

	const onRefresh = async () => {
		setRefreshing(true);
		if (user?.id) {
			await getUserActivities(user.id.toString());
		}
		setRefreshing(false);
	};

	const handleActivityPress = (activity: Activity) => {
		navigation.navigate('ActivitiesDetails', {activityId: activity});
	};

	const renderActivity = ({item}: {item: Activity}) => {
		let iconColor = '#32CD32';

		return (
			<TouchableOpacity onPress={() => handleActivityPress(item)}>
				<View style={styles.activityContainer}>
					<View style={[styles.iconContainer, {backgroundColor: iconColor}]} />
					<View style={styles.textContainer}>
						<Text style={styles.activityTitle}>{item.name}</Text>
						<Text style={styles.activityDetails}>
							{convertDateToDMYString(new Date(item.date))} - {convertDateToTimeString(new Date(item.time))}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.filtersContainer}>
				{/* Renderización de switches basados en clasificaciones (si es necesario) */}
			</View>

			<View style={styles.activitiesContainer}>
				<Text style={styles.activitiesTitle}>Actividades</Text>
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
});

export default SavedActivities;
