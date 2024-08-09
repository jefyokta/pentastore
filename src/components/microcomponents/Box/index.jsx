import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import style from '../../style';
import {useNavigation} from '@react-navigation/native';
import { ImgUri } from '../../../const';

const Box = ({img = 'profile.png', children, func}) => {
  const navigation = useNavigation();
  // const handlePress = () => func;

  return (
    <TouchableOpacity style={[style.box,{borderWidth:.2,borderColor:'rgba(255,255,255,.4)'}]} onPress={func}>
      <ImageBackground source={{uri:`${ImgUri}/public/img/gradient.png`}} resizeMode='cover' style={{flex:1,height:'110%',width:'100%'}}>
        <View
          style={{
            minHeight: 50,
            height: 200,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'hidden',
            alignItems: 'center',
            // borderWidth:1
            
          }}>
          <ImageBackground
            source={{uri: `${ImgUri}/public/img/${img}`}}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
              display:'flex',
              justifyContent:'flex-end'
            }}
          >
        {children}
        </ImageBackground>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
export default Box;
