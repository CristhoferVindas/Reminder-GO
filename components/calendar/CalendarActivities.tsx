import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'; // For the heart icon
import {CalendarStackParamList} from '@/app/stackCalendar/StackCalendar';
import {StackNavigationProp} from '@react-navigation/stack';
import {useRoute, RouteProp} from '@react-navigation/native';
import useActivitiesStore from '@/store/activities.store';
import useClassificationsStore from '@/store/classification.store';
import {Activity} from '@/types/Activity.type'; // Asegúrate de importar el tipo
import {convertDateToDMYString, convertDateToTimeString} from '@/functions/handleTime';
import {Switch} from 'react-native-gesture-handler';

type CalendarScreenNavigationProp = StackNavigationProp<
	CalendarStackParamList,
	'CalendarActivities'
>;

type Props = {
	navigation: CalendarScreenNavigationProp;
};

const CalendarActivities = ({navigation}: Props) => {
	const getActivitiesByDate = useActivitiesStore((state) => state.getActivitiesByDate);
	const activitiesByDate = useActivitiesStore((state) => state.activitiesByDate);

	const classifications = useClassificationsStore((state) => state.classifications);
	const getClassifications = useClassificationsStore((state) => state.getClassifications);

	const route = useRoute<RouteProp<CalendarStackParamList, 'CalendarActivities'>>();
	const {date} = route.params;

	const [switchStates, setSwitchStates] = useState<{[key: string]: boolean}>({});

	useEffect(() => {
		getActivitiesByDate(new Date(date));
		getClassifications('A'); // Cargamos clasificaciones
	}, [date]);

	useEffect(() => {
		if (classifications) {
			const initialSwitchStates = classifications.reduce((acc, classification) => {
				acc[classification.id || 0] = true; // Por defecto todas las clasificaciones activas
				return acc;
			}, {} as {[key: string]: boolean});
			setSwitchStates(initialSwitchStates);
		}
	}, [classifications]);

	const toggleSwitch = (classificationId: string) => {
		setSwitchStates((prevState) => ({
			...prevState,
			[classificationId]: !prevState[classificationId], // Cambiamos el estado del switch correspondiente
		}));
	};

	const renderEvent = ({item}: {item: Activity}) => {
		let iconColor = '#32CD32'; // Valor por defecto si no hay clasificación

		if (item.classifications) {
			const classification = classifications?.find(
				(classification) => classification.id === item.classifications.id
			);

			if (classification) {
				iconColor = classification.color; // Asignamos el color de la clasificación
			}
		}

		return (
			<View style={styles.activityContainer}>
				<View style={[styles.iconContainer, {backgroundColor: iconColor}]} />
				<View style={styles.textContainer}>
					<Text style={styles.activityTitle}>{item.name}</Text>
					<Text style={styles.activityDetails}>
						{convertDateToDMYString(new Date(item.date))} - {convertDateToTimeString(new Date(item.time))}
					</Text>
				</View>
				<TouchableOpacity style={styles.favoriteIconContainer}>
					<MaterialIcons
						name={item.active === 'yes' ? 'favorite' : 'favorite-border'}
						size={24}
						color={item.active === 'yes' ? 'blue' : 'gray'}
					/>
				</TouchableOpacity>
			</View>
		);
	};

	const filteredActivities = activitiesByDate?.filter((activity) => {
		if (activity.classifications) {
			return switchStates[activity?.classifications?.id || 0];
		}
		return false;
	});

	return (
		<View style={styles.container}>
			<Text style={styles.header}>{convertDateToDMYString(new Date(date))}</Text>
			<View style={styles.filtersContainer}>
				{classifications?.map((classification) => (
					<View key={classification.id} style={styles.filterItem}>
						<Text style={styles.filterLabel}>{classification.name}</Text>
						<Switch
							value={switchStates[classification.id || 0]}
							onValueChange={() => toggleSwitch(classification.id?.toString() || '')}
							thumbColor={switchStates[classification.id || 0] ? classification.color : '#f4f3f4'}
							trackColor={{false: '#767577', true: '#767577'}}
						/>
					</View>
				))}
			</View>

			<FlatList
				data={filteredActivities} // Usamos la lista filtrada por clasificación
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderEvent}
				contentContainerStyle={styles.list}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F2F2F2',
		paddingHorizontal: 20,
		paddingTop: 40,
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		textAlign: 'center',
	},
	list: {
		paddingBottom: 20,
	},
	filtersContainer: {
		marginBottom: 20,
	},
	filterItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 1,
		backgroundColor: '#333',
		padding: 5,
		borderRadius: 10,
	},
	filterLabel: {
		fontSize: 16,
		color: '#fff',
	},
	eventContainer: {
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 10,
		marginBottom: 10,
		borderLeftWidth: 15,
		marginRight: 10,
	},
	eventInfo: {
		flex: 1,
	},
	eventTitle: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	eventTime: {
		fontSize: 14,
		color: '#666',
	},
	iconContainer: {
		width: 15,
		height: 60,
		borderTopStartRadius: 10,
		borderBottomStartRadius: 10,
		marginRight: 10,
	},
	activitiesContainer: {
		flex: 1,
		marginTop: 10,
	},
	activitiesTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	activityContainer: {
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 10,
		marginBottom: 10,
	},
	textContainer: {
		flex: 1,
	},
	activityTitle: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	activityDetails: {
		fontSize: 14,
		color: '#555',
	},
	favoriteIconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10, // Agregamos algo de padding para mejor toque
		marginRight: 10, // Separar un poco el botón del borde
	},
});

export default CalendarActivities;
