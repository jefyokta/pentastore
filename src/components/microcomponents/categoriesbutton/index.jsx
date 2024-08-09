import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity} from 'react-native';
import { kuning,info } from '../../colors';

const CategoryButton = ({text, nav}) => {
  const navigation = useNavigation();
const  size =17
const color ='rgba(252, 202, 224, 0.1)'
const color2 ='rgba(252, 202, 224, 0.2)'

  if (!nav) {
    return (
      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          // borderBottomWidth: 1,
          padding: 10,
          backgroundColor: color,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: color2,
          margin: 10,
        }}>
        <Text
          style={{
            color: kuning,
            fontSize: size,
            fontWeight: '700',
          }}>
          {text}
        </Text>
        <Text
          style={{
            color: 'white',
          }}>
          {'>'}
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderBottomWidth: 0.5,
        padding: 10,
        backgroundColor: color,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: color2,
        margin:10
      }}
      onPress={() => navigation.navigate('category', {category: nav})}>
      <Text
        style={{
          color: kuning,
          fontSize: size,
          fontWeight:'700'
        }}>
        {text}
      </Text>
      <Text
        style={{
          color: 'white',
        }}>
        {'>'}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;
