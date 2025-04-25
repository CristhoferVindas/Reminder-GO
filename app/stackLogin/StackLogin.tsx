import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@/components/login/LoginGoogle';
import SignInGoogle from '@/components/signin/signinGoogle';
export type LoginStackParamList = {
	Login: undefined;
	LoginActivities: {date: string};
};

const Stack = createStackNavigator<LoginStackParamList>();
export function StackLogin() {
	return (
		<Stack.Navigator
			initialRouteName="Login"
			screenOptions={{
				headerStyle: {
					backgroundColor: '#111827',
				},
				headerTintColor: '#fff',
				headerShown: true,
				headerTitle: '',
				animationEnabled: false,
			}}
		>
			<Stack.Screen name="Login" component={LoginScreen} options={() => ({
				animationEnabled: false,
			})} />
			<Stack.Screen name="LoginActivities" component={SignInGoogle} options={() => ({
				animationEnabled: false,
			})} />
		</Stack.Navigator>
	);
}
