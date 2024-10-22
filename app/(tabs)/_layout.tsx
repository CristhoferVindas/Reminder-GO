import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackCategory} from '../stackCategory/StackCategory';
import Calendar from './calendar';
import Saved from './saved';
import Configuration from './configuration';
import {StackCalendar} from '../stackCalendar/StackCalendar';

const Tabs = createBottomTabNavigator();
export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs.Navigator
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
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
				component={Saved}
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
				component={Configuration}
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
