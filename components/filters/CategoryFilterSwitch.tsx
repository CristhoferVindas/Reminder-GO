import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, Switch, TouchableOpacity, Animated, Easing} from 'react-native';
import {Category} from '@/types/Category.type';
import {MaterialIcons} from '@expo/vector-icons';

type CategoryFilterDropdownProps = {
	categories: Category[];
	switchStates: {[key: string]: boolean};
	onToggleSwitch: (categoryId: string) => void;
	onClearFilters: () => void;
};

const CategoryFilterDropdown = ({
	categories,
	switchStates,
	onToggleSwitch,
	onClearFilters,
}: CategoryFilterDropdownProps) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const animatedHeight = useRef(new Animated.Value(0)).current;
	const animatedOpacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const allFiltersOff = Object.values(switchStates).every((state) => !state);
		if (allFiltersOff) {
			onClearFilters();
		}
	}, [switchStates]);

	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev);

		Animated.timing(animatedHeight, {
			toValue: isDropdownOpen ? 0 : categories.length * 50,
			duration: 200,
			easing: Easing.ease,
			useNativeDriver: false,
		}).start();

		Animated.timing(animatedOpacity, {
			toValue: isDropdownOpen ? 0 : 1,
			duration: 200,
			easing: Easing.step1,
			useNativeDriver: false,
		}).start();
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.dropdownHeader} onPress={toggleDropdown}>
				<Text style={styles.dropdownTitle}>Filtrar por Categorías</Text>
				<MaterialIcons name={isDropdownOpen ? 'expand-less' : 'expand-more'} size={24} color="#fff" />
			</TouchableOpacity>

			<Animated.View
				style={[
					styles.filtersContainer,
					{
						height: animatedHeight,
						opacity: animatedOpacity,
					},
				]}
			>
				{categories.map((category) => (
					<View key={category.id} style={styles.filterItem}>
						<Text style={styles.filterLabel}>{category.name}</Text>
						<Switch
							value={category.id ? switchStates[category.id] : false}
							onValueChange={() => {
								if (category.id) {
									toggleDropdown();
									onToggleSwitch(category.id.toString());
								}
							}}
						/>
					</View>
				))}
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
	},
	dropdownHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#333',
		padding: 10,
		borderRadius: 10,
	},
	dropdownTitle: {
		fontSize: 16,
		color: '#fff',
		fontWeight: 'bold',
	},
	filtersContainer: {
		overflow: 'scroll',
		backgroundColor: '#444',
		borderRadius: 10,
		paddingTop: 10,
		paddingHorizontal: 15,
		width: '100%',
	},
	filterItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 5,
	},
	filterLabel: {
		fontSize: 16,
		color: '#fff',
	},
});

export default CategoryFilterDropdown;
