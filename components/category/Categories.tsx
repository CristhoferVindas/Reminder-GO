import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Image, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import useCategoriesStore from '@/store/categories.store';
import {Category} from '@/types/Category.type';
import {StackNavigationProp} from '@react-navigation/stack';
import {CategoryStackParamList} from '@/app/stackCategory/StackCategory';
import useUsersStore from '@/store/user.store';
import NotificationModal from '../notificationModal/NotificationModal';

type ActivitiesScreenNavigationProp = StackNavigationProp<CategoryStackParamList, 'Activities'>;

type Props = {
	navigation: ActivitiesScreenNavigationProp;
};

const Categories = ({navigation}: Props) => {
	const [search, setSearch] = useState('');
	const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
	const getCategories = useCategoriesStore((state) => state.getCategories);
	const categories = useCategoriesStore((state) => state.categories);
	const user = useUsersStore((state) => state.user);

	useEffect(() => {
		if (user?.institutions?.id) {
			getCategories('A', user?.institutions.id.toString());
		}
	}, [, user]);

	useEffect(() => {
		if (search) {
			setFilteredCategories(
				(categories || []).filter((category) => category.name.toLowerCase().includes(search.toLowerCase()))
			);
		} else {
			setFilteredCategories(categories || []);
		}
	}, [search, categories]);

	const renderItem = ({item}: {item: Category}) => (
		<TouchableOpacity
			style={styles.categoryItem}
			onPress={() => navigation.navigate('Activities', {categoryId: item})}
		>
			<Image
				source={{
					uri:
						'https://i.pinimg.com/736x/2b/0c/9d/2b0c9d791afa8682151e3aafb9318f34.jpg',
				}}
				style={styles.categoryImage}
			/>
			<View style={styles.categoryText}>
				<Text style={styles.categoryTitle}>{item.name}</Text>
				<Text style={styles.categoryDescription}>{item.description}</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<NotificationModal />
			<View style={styles.profileContainer}>
				<Image source={{uri: user?.image}} style={styles.profileImage} />
				<Text style={styles.profileName}>{user?.name}</Text>
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
				data={filteredCategories}
				renderItem={renderItem}
				keyExtractor={(item) => item.id?.toString() || ''}
				style={styles.categoryList}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#374151',
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
		color: '#F97316',
	},
	profileContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
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
		color: '#F97316',
	},
	categoryList: {
		flex: 1,
	},
	categoryItem: {
		flexDirection: 'row',
		backgroundColor: '#1e293b',
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
		color: '#ffff',
	},
	categoryTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#ffff',
	},
	categoryDescription: {
		fontSize: 14,
		color: '#ffff',
	},
});

export default Categories;
