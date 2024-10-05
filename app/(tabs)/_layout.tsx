import {Tabs} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Inicio',
					tabBarIcon: ({color, focused}) => (
						<TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="saved"
				options={{
					title: 'Guardados',
					tabBarIcon: ({color, focused}) => (
						<TabBarIcon name={focused ? 'heart' : 'heart-outline'} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="calendar"
				options={{
					title: 'Calendario',
					tabBarIcon: ({color, focused}) => (
						<TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="configuration"
				options={{
					title: 'Configuración',
					tabBarIcon: ({color, focused}) => (
						<TabBarIcon name={focused ? 'grid' : 'grid-outline'} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
