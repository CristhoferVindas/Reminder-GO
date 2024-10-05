import React, {useState} from 'react';
import {View, Text, TextInput, Image, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

interface Category {
	id: string;
	title: string;
	description: string;
	image: any;
}

const data: Category[] = [
	{
		id: '1',
		title: 'Deportivas',
		description: 'Partidos fútbol, baloncesto',
		image: require('@/images/PrimeraImagen.png'),
	},
	{
		id: '2',
		title: 'Recreativas',
		description: 'Caminatas, ping pong, karaoke',
		image: require('@/images/PrimeraImagen.png'),
	},
	{
		id: '3',
		title: 'Obligatorias',
		description: 'Charlas de beca, salud, talleres',
		image: require('@/images/PrimeraImagen.png'),
	},
	{
		id: '4',
		title: 'Matrícula',
		description: 'Matrícula, retiros justificados',
		image: require('@/images/PrimeraImagen.png'),
	},
	{
		id: '5',
		title: 'Matrícula',
		description: 'Matrícula, retiros justificados',
		image: require('@/images/PrimeraImagen.png'),
	},
	{
		id: '6',
		title: 'Matrícula',
		description: 'Matrícula, retiros justificados',
		image: require('@/images/PrimeraImagen.png'),
	},
	{
		id: '7',
		title: 'Matrícula',
		description: 'Matrícula, retiros justificados',
		image: require('@/images/PrimeraImagen.png'),
	},
	{
		id: '8',
		title: 'Matrícula',
		description: 'Matrícula, retiros justificados',
		image: require('@/images/PrimeraImagen.png'),
	},
	{
		id: '9',
		title: 'Matrícula',
		description: 'Matrícula, retiros justificados',
		image: require('@/images/PrimeraImagen.png'),
	},
	{
		id: '10',
		title: 'Matrícula',
		description: 'Matrícula, retiros justificados',
		image: require('@/images/PrimeraImagen.png'),
	},
	{
		id: '11',
		title: 'Matrícula',
		description: 'Matrícula, retiros justificados',
		image: require('@/images/PrimeraImagen.png'),
	},
];

const Categories: React.FC = () => {
	const [search, setSearch] = useState('');
	const renderItem = ({item}: {item: Category}) => (
		<TouchableOpacity style={styles.categoryItem}>
			<Image source={item.image} style={styles.categoryImage} />
			<View style={styles.categoryText}>
				<Text style={styles.categoryTitle}>{item.title}</Text>
				<Text style={styles.categoryDescription}>{item.description}</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={{uri: 'https://via.placeholder.com/100'}} style={styles.profileImage} />
				<Text style={styles.profileName}>Nataly Vaitkevich</Text>
			</View>

			<View style={styles.searchContainer}>
				<TextInput
					style={styles.searchInput}
					placeholder="Buscar categorías"
					value={search}
					onChangeText={setSearch}
				/>
				<Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
			</View>

			<Text style={styles.sectionTitle}>Categorías</Text>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				style={styles.categoryList}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f2f2f2',
		padding: 20,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
	},
	profileImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	profileName: {
		fontSize: 18,
		fontWeight: 'bold',
		marginLeft: 10,
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 20,
		paddingHorizontal: 10,
		marginBottom: 20,
	},
	searchInput: {
		flex: 1,
		paddingVertical: 8,
		paddingLeft: 10,
		fontSize: 16,
	},
	searchIcon: {
		marginLeft: 10,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	categoryList: {
		flex: 1,
	},
	categoryItem: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		padding: 15,
		borderRadius: 10,
		marginBottom: 10,
		alignItems: 'center',
	},
	categoryImage: {
		width: 50,
		height: 50,
		borderRadius: 10,
	},
	categoryText: {
		marginLeft: 10,
	},
	categoryTitle: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	categoryDescription: {
		fontSize: 14,
		color: '#666',
	},
});

export default Categories;
