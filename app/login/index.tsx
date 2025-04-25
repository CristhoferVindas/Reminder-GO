import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@/components/login/LoginGoogle';
import SignInGoogle from '@/components/signin/signinGoogle';
export type LoginStackParamList = {
	Login: undefined;
	SignInGoogle: undefined;
};

const Stack = createStackNavigator<LoginStackParamList>();
const home = () => {
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
			}}
		>
			<Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
			<Stack.Screen name="SignInGoogle" component={SignInGoogle} options={{headerShown: false}} />
		</Stack.Navigator>
	);
};

export default home;
