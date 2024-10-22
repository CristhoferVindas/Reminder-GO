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
	navigation: CalendarScreenNavigationProp;
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
					backgroundColor: '#EDEAFF',
					calendarBackground: '#EDEAFF',
					textSectionTitleColor: '#000',
					selectedDayTextColor: '#ffffff',
					todayTextColor: '#4A3AFF',
					dayTextColor: '#000',
					textDisabledColor: '#d9e1e8',
					monthTextColor: '#000',
					arrowColor: '#4A3AFF',
					indicatorColor: '#4A3AFF',
				}}
			/>
			<View style={styles.buttonContainer}>
				<Text>{`Fecha seleccionada: ${selectedDate}`}</Text>
				<Button
					title="Seleccionar"
					onPress={() => (
						console.log('Fecha seleccionada:', selectedDate),
						navigation.navigate('CalendarActivities', {date: selectedDate})
					)}
					color="#4A3AFF"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EDEAFF',
		padding: 10,
	},
	buttonContainer: {
		marginTop: 20,
		alignItems: 'center',
	},
	navigationContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 20,
	},
});

export default CalendarScreen;
