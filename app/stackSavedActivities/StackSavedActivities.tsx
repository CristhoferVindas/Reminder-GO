import {createStackNavigator} from '@react-navigation/stack';
import SavedActivities from '@/components/savedActivities/SavedActivities';
import {Activity} from '@/types/Activity.type';
import ActivitiesDetails from '@/components/activity/ActivitiesDetails';
export type RootSavedActivitiesDetailsStackParamList = {
	SavedActivitiesHome: undefined;
	ActivitiesDetails: {activityId: Activity};
};

const Stack = createStackNavigator<RootSavedActivitiesDetailsStackParamList>();
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
			<Stack.Screen name="SavedActivitiesHome" component={SavedActivities} />
			<Stack.Screen name="ActivitiesDetails" component={ActivitiesDetails} />
		</Stack.Navigator>
	);
}
