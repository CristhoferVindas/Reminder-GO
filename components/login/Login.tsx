import {StyleSheet, Text, View} from 'react-native';
import IconButton from '../customComponents/button/IconButton';

const Login = () => {
	return (
		<View style={styles.container}>
			<View style={styles.textView}>
				<Text style={styles.text}>ReminderGo</Text>
			</View>
			<View style={styles.buttonView}>
				<IconButton></IconButton>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		height: '100%',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textView: {
		flex: 1,
		backgroundColor: 'white',
		height: '50%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonView: {
		backgroundColor: 'white',
		height: '50%',
	},
	scrollview: {
		flex: 1,
		alignContent: 'center',
		backgroundColor: 'red',
	},

	text: {
		textAlign: 'auto',
		textAlignVertical: 'center',
		fontSize: 50,
	},
	image: {
		height: 300,
		width: 300,
	},
	button: {
		borderRadius: 50,
	},
});
export default Login;
