import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Agenda, DateData} from 'react-native-calendars';
import {StackNavigationProp} from '@react-navigation/stack';
import {CalendarStackParamList} from '@/app/stackCalendar/StackCalendar';
import useActivitiesStore from '@/store/activities.store';
import useUsersStore from '@/store/user.store';
import {Activity} from '@/types/Activity.type';

type CalendarScreenNavigationProp = StackNavigationProp<
	CalendarStackParamList,
	'CalendarActivities'
>;

type Props = {
	navigation: CalendarScreenNavigationProp | null;
};

const CalendarScreen = ({navigation}: Props) => {
	const [selectedDate, setSelectedDate] = useState('');
	const user = useUsersStore((state) => state.user);
	const activitiesCalendar = useActivitiesStore((state) => state.activitiesCalendar);
	const getActivitiesByInstitutionID = useActivitiesStore(
		(state) => state.getActivitiesByInstitutionID
	);

	useEffect(() => {
		getActivitiesByInstitutionID('A', user?.institutions?.id?.toString() || '');
	}, []);

	const formatActivitiesForAgenda = () => {
		const items: {[key: string]: Activity[]} = {};

		activitiesCalendar?.forEach((activity: Activity) => {
			const date = new Date(activity.date).toLocaleDateString('en-CA'); 
			if (!items[date]) {
				items[date] = [];
			}
			items[date].push(activity);
		});

		return items;
	};

	const handleDayPress = (day: DateData) => {
		if (day.dateString !== selectedDate) {
			setSelectedDate(day.dateString);
		}
	};
	const handlePress = (activity: Activity) => {
		navigation?.navigate('ActivitiesDetails', {activityId: activity});
	};
	return (
		<View style={styles.container}>
			<Agenda
				items={formatActivitiesForAgenda()}
				selected={selectedDate}
				renderItem={(item: Activity) => (
					<TouchableOpacity style={styles.eventItem} onPress={() => handlePress(item)} activeOpacity={0.8}>
						<Text style={styles.eventText}>{item.name}</Text>
						<Text style={styles.eventDescription}>{item.description}</Text>
						<Text style={styles.eventLocation}>Categoría: {item.categories.name}</Text>
					</TouchableOpacity>
				)}
				renderEmptyData={() => (
					<View style={styles.emptyData}>
						<Text style={styles.emptyText}>No hay eventos programados para esta fecha</Text>
					</View>
				)}
				theme={{
					backgroundColor: '#374151',
					calendarBackground: '#374151',
					agendaDayTextColor: '#000',
					agendaDayNumColor: '#000',
					agendaTodayColor: '#F97316',
					agendaKnobColor: '#F97316',
					textSectionTitleColor: '#ffffff',
					selectedDayTextColor: '#ffffff',
					selectedDayBackgroundColor: '#F97316',
					todayTextColor: '#F97316',
					dayTextColor: '#ffffff',
					textDisabledColor: '#6B7280',
					monthTextColor: '#ffffff',
					arrowColor: '#F97316',
					indicatorColor: '#F97316',
				}}
				onDayPress={handleDayPress}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#374151',
	},
	eventItem: {
		backgroundColor: '#1E293B',
		padding: 15,
		marginVertical: 5,
		borderRadius: 8,
	},
	eventText: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	eventDescription: {
		color: '#9CA3AF',
		fontSize: 14,
		marginTop: 5,
	},
	eventLocation: {
		color: '#9CA3AF',
		fontSize: 14,
		marginTop: 5,
	},
	emptyData: {
		backgroundColor: '#1E293B',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	emptyText: {
		color: '#9CA3AF',
		fontSize: 16,
		textAlign: 'center',
	},
	buttonContainer: {
		marginTop: 20,
		alignItems: 'center',
	},
	selectedDateText: {
		color: '#F3F4F6',
		fontSize: 16,
		marginBottom: 10,
		textAlign: 'center',
	},
	selectButton: {
		backgroundColor: '#F97316',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 8,
		alignItems: 'center',
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: 'bold',
	},
	buttonDisabled: {
		backgroundColor: '#6B7280',
	},
});

export default CalendarScreen;
