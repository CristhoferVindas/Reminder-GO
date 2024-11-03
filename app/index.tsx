import {Text, View} from 'react-native';
import LoginGoogle from '@/components/login/LoginGoogle';

const home = () => {
	return (
		<View style={{height: '100%', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text style={{color: 'green'}}>sss</Text>
			<LoginGoogle></LoginGoogle>
		</View>
	);
};

export default home;
