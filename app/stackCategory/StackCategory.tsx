import {createStackNavigator} from '@react-navigation/stack';
import Categories from '@/components/category/Categories';
import Activities from '@/components/activity/Activities';
import ActivitiesDetails from '@/components/activity/ActivitiesDetails';
import {Activity} from '@/types/Activity.type';
export type RootStackParamList = {
	Home: undefined;
	Activities: {categoryId: number};
	ActivitiesDetails: {activityId: Activity};
	Calendar: {categoryId: number};
};

const Stack = createStackNavigator<RootStackParamList>();
export function StackCategory() {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerStyle: {
					backgroundColor: '#111827',
				},
				headerTintColor: '#fff',
				headerShown: true,
				headerTitle: '',
			}}
		>
			<Stack.Screen name="Home" component={Categories} />
			<Stack.Screen name="Activities" component={Activities} />
			<Stack.Screen name="ActivitiesDetails" component={ActivitiesDetails} />
		</Stack.Navigator>
	);
}
