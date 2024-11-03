import {createStackNavigator} from '@react-navigation/stack';
import CalendarScreen from '@/components/calendar/Calendar';
import CalendarActivities from '@/components/calendar/CalendarActivities';
export type CalendarStackParamList = {
	Calendar: undefined;
	CalendarActivities: {date: string};
};

const Stack = createStackNavigator<CalendarStackParamList>();
export function StackCalendar() {
	return (
		<Stack.Navigator
			initialRouteName="Calendar"
			screenOptions={{
				headerStyle: {
					backgroundColor: '#111827',
				},
				headerTintColor: '#fff',
				headerShown: true,
				headerTitle: '',
			}}
		>
			<Stack.Screen name="Calendar" component={CalendarScreen} />
			<Stack.Screen name="CalendarActivities" component={CalendarActivities} />
		</Stack.Navigator>
	);
}
