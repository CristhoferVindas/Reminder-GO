import {createStackNavigator} from '@react-navigation/stack';
import Categories from '@/components/category/Categories';
import Activities from '@/components/activity/Activities';
import ActivitiesDetails from '@/components/activity/ActivitiesDetails';
import {Activity} from '@/types/Activity.type';
import {Category} from '@/types/Category.type';
export type CategoryStackParamList = {
	Home: undefined;
	Activities: {categoryId: Category};
	ActivitiesDetails: {activityId: Activity};
	Calendar: {categoryId: number};
};

const Stack = createStackNavigator<CategoryStackParamList>();
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
				headerTitle: 'Categorías',
			}}
		>
			<Stack.Screen name="Home" component={Categories} />
			<Stack.Screen
				name="Activities"
				component={Activities}
				options={({route}) => ({
					title: 'Actividades',
					headerTitle: 'Actividades ' + route.params.categoryId.name,
					animationEnabled: false,
				})}
			/>
			<Stack.Screen
				name="ActivitiesDetails"
				component={ActivitiesDetails}
				options={() => ({
					title: 'Detalles de Actividad',
					headerTitle: 'Detalles de Actividad ',
					animationEnabled: false,
				})}
			/>
		</Stack.Navigator>
	);
}
