import {createStackNavigator} from '@react-navigation/stack';
import Categories from '@/components/category/Categories';
import Activities from '@/components/activity/Activities';
import Calendar from '../(tabs)/calendar';
export type RootStackParamList = {
	Home: undefined;
	Activities: {categoryId: number};
	Calendar: {categoryId: number};
};

const Stack = createStackNavigator<RootStackParamList>();
export function StackCategory() {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen name="Home" component={Categories} />
			<Stack.Screen name="Activities" component={Activities} />
		</Stack.Navigator>
	);
}
