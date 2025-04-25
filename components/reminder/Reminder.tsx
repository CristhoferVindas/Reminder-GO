import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { CategoryStackParamList } from '@/app/stackCategory/StackCategory';



const ReminderScreen = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Actividad: </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    dueDate: {
        fontSize: 14,
        color: 'gray',
    },
});

export default ReminderScreen;
