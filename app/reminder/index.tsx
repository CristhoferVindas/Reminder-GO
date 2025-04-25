import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReminderScreen from '@/components/reminder/Reminder';
import { Activity } from '@/types/Activity.type';
import { useNavigationContainerRef } from 'expo-router';

export type ReminderStackParamList = {
    Reminder: { activity: string };
};

const Stack = createStackNavigator<ReminderStackParamList>();
export const navigationRef = useNavigationContainerRef();
const Home: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName="Reminder"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#111827',
                },
                headerTintColor: '#fff',
                headerShown: true,
                headerTitle: '',
            }}
        >
            <Stack.Screen name="Reminder" component={ReminderScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default Home;
