import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackCategory} from '../stackCategory/StackCategory';
import {StackCalendar} from '../stackCalendar/StackCalendar';
import {StackSavedActiviy} from '../stackSavedActivities/StackSavedActivities';
import {StackConfiguration} from '../stackConfiguration/StackConfiguration';

const Tabs = createBottomTabNavigator();
export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs.Navigator
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarStyle: {
					backgroundColor: Colors[colorScheme ?? 'dark'].background,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				component={StackCategory}
				options={{
					title: 'Inicio',
					tabBarIcon: ({color, focused}) => (
						<TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="saved"
				component={StackSavedActiviy}
				options={{
					title: 'Guardados',
					tabBarIcon: ({color, focused}) => (
						<TabBarIcon name={focused ? 'heart' : 'heart-outline'} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="calendar"
				component={StackCalendar}
				options={{
					title: 'Calendario',
					tabBarIcon: ({color, focused}) => (
						<TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="configuration"
				component={StackConfiguration}
				options={{
					title: 'Configuración',
					tabBarIcon: ({color, focused}) => (
						<TabBarIcon name={focused ? 'grid' : 'grid-outline'} color={color} />
					),
				}}
			/>
		</Tabs.Navigator>
	);
}
