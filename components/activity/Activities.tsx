import React, {useState} from 'react';
import {View, Text, Image, Switch, FlatList, StyleSheet} from 'react-native';

interface Activity {
	id: string;
	title: string;
	time: string;
	date: string;
	type: 'mandatory' | 'regular' | 'optional';
}

const App = () => {
	const [mandatory, setMandatory] = useState(true);
	const [regular, setRegular] = useState(true);
	const [optional, setOptional] = useState(true);

	const activities: Activity[] = [
		{id: '1', title: 'Charla beca', time: '10:00 am', date: '09 agosto', type: 'mandatory'},
		{id: '2', title: 'Taller despéjate', time: '10:00 am', date: '23 agosto', type: 'mandatory'},
		{id: '3', title: 'Caminada sendero', time: '10:00 am', date: '26 agosto', type: 'regular'},
		{id: '4', title: 'Partido fútbol visita', time: '10:00 am', date: '28 octubre', type: 'optional'},
		{id: '5', title: 'Partido fútbol 2', time: '10:00 am', date: '29 octubre', type: 'optional'},
	];

	const renderActivity = ({item}: {item: Activity}) => {
		let iconColor;
		if (item.type === 'mandatory') {
			iconColor = '#FF6347';
		} else if (item.type === 'regular') {
			iconColor = '#1E90FF';
		} else {
			iconColor = '#32CD32';
		}

		return (
			<View style={styles.activityContainer}>
				<View style={[styles.iconContainer, {backgroundColor: iconColor}]} />
				<View style={styles.textContainer}>
					<Text style={styles.activityTitle}>{item.title}</Text>
					<Text style={styles.activityDetails}>
						{item.time} - {item.date}
					</Text>
				</View>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.profileContainer}>
				<Image
					source={{uri: 'https://randomuser.me/api/portraits/women/95.jpg'}}
					style={styles.profileImage}
				/>
				<Text style={styles.profileName}>Nataly Vaitkevich</Text>
			</View>

			<View style={styles.filtersContainer}>
				<View style={styles.filterItem}>
					<Text style={styles.filterLabel}>Obligatorias</Text>
					<Switch
						value={mandatory}
						onValueChange={() => setMandatory(!mandatory)}
						thumbColor={mandatory ? '#FF6347' : '#f4f3f4'}
						trackColor={{false: '#767577', true: '#767577'}}
					/>
				</View>
				<View style={styles.filterItem}>
					<Text style={styles.filterLabel}>Regulares</Text>
					<Switch
						value={regular}
						onValueChange={() => setRegular(!regular)}
						thumbColor={regular ? '#1E90FF' : '#f4f3f4'}
						trackColor={{false: '#767577', true: '#767577'}}
					/>
				</View>
				<View style={styles.filterItem}>
					<Text style={styles.filterLabel}>No obligatorias</Text>
					<Switch
						value={optional}
						onValueChange={() => setOptional(!optional)}
						thumbColor={optional ? '#32CD32' : '#f4f3f4'}
						trackColor={{false: '#767577', true: '#767577'}}
					/>
				</View>
			</View>

			<View style={styles.activitiesContainer}>
				<Text style={styles.activitiesTitle}>Actividades</Text>
				<FlatList data={activities} renderItem={renderActivity} keyExtractor={(item) => item.id} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#f4f4f4',
	},
	profileContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
	},
	profileImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 10,
	},
	profileName: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	filtersContainer: {
		marginBottom: 20,
	},
	filterItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 5,
		backgroundColor: '#333',
		padding: 10,
		borderRadius: 10,
	},
	filterLabel: {
		fontSize: 16,
		color: '#fff',
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
	iconContainer: {
		width: 25,
		height: 60,
		borderTopStartRadius: 10,
		borderBottomStartRadius: 10,

		marginRight: 10,
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
});

export default App;
