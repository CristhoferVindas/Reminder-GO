import React, {useState} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import moment from 'moment';
import {StackNavigationProp} from '@react-navigation/stack';
import {CalendarStackParamList} from '@/app/stackCalendar/StackCalendar';

type CalendarScreenNavigationProp = StackNavigationProp<
	CalendarStackParamList,
	'CalendarActivities'
>;

type Props = {
	navigation: CalendarScreenNavigationProp | null;
};

const CalendarScreen = ({navigation}: Props) => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState('');
	return (
		<View style={styles.container}>
			<Calendar
				onDayPress={(day: DateData) => {
					setSelectedDate(day.dateString);
				}}
				markedDates={{
					[selectedDate]: {
						selected: true,
						marked: true,
						selectedColor: '#4A3AFF',
					},
				}}
				current={moment(currentDate).format('YYYY-MM-DD')}
				theme={{
					backgroundColor: '#374151',
					calendarBackground: '#374151',
					textSectionTitleColor: '#ffffff',
					selectedDayTextColor: '#ffffff',
					todayTextColor: '#4A3AFF',
					dayTextColor: '#ffffff',
					textDisabledColor: '#6B7280',
					monthTextColor: '#ffffff',
					arrowColor: '#4A3AFF',
					indicatorColor: '#4A3AFF',
				}}
			/>
			<View style={styles.buttonContainer}>
				<Text style={styles.selectedDateText}>{`Fecha seleccionada: ${selectedDate}`}</Text>
				<Button
					title="Seleccionar"
					onPress={() => navigation?.navigate('CalendarActivities', {date: selectedDate})}
					color="#4A3AFF"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#374151',
		padding: 10,
	},
	buttonContainer: {
		marginTop: 20,
		alignItems: 'center',
	},
	selectedDateText: {
		color: '#ffffff',
	},
	navigationContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 20,
	},
});

export default CalendarScreen;
