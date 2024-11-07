import {createStackNavigator} from '@react-navigation/stack';
import SavedActivities from '@/components/savedActivities/SavedActivities';
import {Activity} from '@/types/Activity.type';
import ActivitiesDetails from '@/components/activity/ActivitiesDetails';
export type SavedActivitiesDetailsStackParamList = {
	SavedActivitiesHome: undefined;
	ActivitiesDetails: {activityId: Activity};
};

const Stack = createStackNavigator<SavedActivitiesDetailsStackParamList>();
export function StackSavedActiviy() {
	return (
		<Stack.Navigator
			initialRouteName="SavedActivitiesHome"
			screenOptions={{
				headerStyle: {
					backgroundColor: '#111827',
				},
				headerTintColor: '#fff',
				headerShown: true,
				headerTitle: '',
			}}
		>
			<Stack.Screen
				name="SavedActivitiesHome"
				component={SavedActivities}
				options={({route}) => ({
					title: 'sadasdas',
					headerTitle: 'Tus Actividades ',
					animationEnabled: false,
				})}
			/>
			<Stack.Screen
				name="ActivitiesDetails"
				component={ActivitiesDetails}
				options={({route}) => ({
					headerTitle: route.params.activityId.name,
					animationEnabled: false,
				})}
			/>
		</Stack.Navigator>
	);
}
