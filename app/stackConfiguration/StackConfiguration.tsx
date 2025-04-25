import { createStackNavigator } from '@react-navigation/stack';
import Configuration from '@/components/configuration/Configuration';
import LoginGoogle from '@/components/login/LoginGoogle';
export type ConfigurationStackParamList = {
	Home: undefined;
	Configuration: undefined;
};

const Stack = createStackNavigator<ConfigurationStackParamList>();
export function StackConfiguration() {
	return (
		<Stack.Navigator
			initialRouteName="Configuration"
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
			<Stack.Screen name="Configuration" component={Configuration} options={() => ({
				animationEnabled: false,
			})} />
			<Stack.Screen name="Home" component={LoginGoogle} options={() => ({
				animationEnabled: false,
			})} />
		</Stack.Navigator>
	);
}
