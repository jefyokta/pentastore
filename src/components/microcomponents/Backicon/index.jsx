import {TouchableOpacity} from 'react-native';
import {BackIcon} from '../carticon/icon';
import {useNavigation} from '@react-navigation/native';

const Back = () => {
    const nav = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => nav.goBack()}
      style={{width: 20, height: 20,marginRight:20}}>
      <BackIcon />
    </TouchableOpacity>
  );
};

export default Back;
