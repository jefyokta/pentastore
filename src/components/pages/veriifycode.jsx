import {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import style from '../style';
import {boxcolor} from '../colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import ServerUri from '../../const';
import Container from '../microcomponents/container';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const nav = useNavigation();
  const route = useRoute();
  const username = route.params.username;

  if (!username) {
    nav.goBack();
  }

  const message = route.params.message;

  const sendVerifyCode = async () => {
    try {
      const result = await axios.post(`${ServerUri}/user/verifycode`, {
        username: username,
        code: code,
      });
      if (result) {
        console.log('berhasil');
        nav.navigate('changepass', {msg: '', username: username, code: code});
      } else {
        console.log('gagal');
        alert('Wrong verify code');
      }
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status == 401)
        alert('Wrong Verify code, Please Check Your email');
      else alert('server is not running');
    }
  };

  const handleNextPress = () => {
    // Panggil sendVerifyCode() saat tombol "Next" ditekan
    sendVerifyCode();
  };

  return (
    <Container>
      <SafeAreaView>
        <View
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontStyle: 'italic'}}>{message}</Text>
          <TextInput
            onChangeText={text => setCode(text)}
            placeholderTextColor={'rgba(255,255,255,.5)'}
            maxLength={6}
            placeholder="Enter Your 6-digit Verify code"
            keyboardType="numeric"
            style={[style.inputstyle, {width: '90%'}]}
          />
          <TouchableOpacity
            style={[style.inputstyle2, {width: '90%'}]}
            onPress={handleNextPress}>
            <Text style={{color: 'white', textAlign: 'center'}}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Container>
  );
};
export default VerifyCode;
