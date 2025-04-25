import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@/components/login/LoginGoogle';
import SignInGoogle from '@/components/signin/signinGoogle';
import React, { useEffect } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
export type LoginStackParamList = {
	Login: undefined;
	SignInGoogle: undefined;
};

useEffect(() => {
	GoogleSignin.configure({
		webClientId: process.env.EXPO_WEB_CLIENT_ID,
	});
}, []);
export function navigate(name: string, params?: object) {
	if (navigationRef.current) {
		navigationRef.current.navigate(name, params);
	} else {
		console.warn('navigationRef no está listo');
	}
}
export const navigationRef = React.createRef<NavigationContainerRef<any>>();
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
