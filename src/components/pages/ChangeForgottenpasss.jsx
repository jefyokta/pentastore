import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {boxcolor} from '../colors';
import style from '../style';
import axios from 'axios';
import ServerUri from '../../const';
import Container from '../microcomponents/container';

const ChangePasswordForgotten = () => {
  const nav = useNavigation();
  const route = useRoute();
  const message = route.params.msg;
  const username = route.params.username;
  const code = route.params.code;
  const [pass, setpass] = useState();

  const changepassword = async () => {
    try {
      const res = await axios.post(
        `${ServerUri}/user/changepasswordforgotten`,
        {
          username: username,
          code: code,
          newpass: pass,
        },
      );
      if (res) nav.navigate('loginpage');
    } catch (error) {
      alert('something went wrong.........');
    }
  };
  return (
    <Container>
      <SafeAreaView>
        <>
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
              onChangeText={text => setpass(text)}
              placeholder="Enter Your New Password"
              style={[style.inputstyle, {width: '90%'}]}
              secureTextEntry={true}
              placeholderTextColor={'rgba(255,255,255,.5)'}
            />
            <TouchableOpacity
              style={[
                style.inputstyle2,
                { width: '90%'},
              ]}
              onPress={changepassword}>
              <Text style={{color: 'white', textAlign: 'center'}}>Change</Text>
            </TouchableOpacity>
          </View>
        </>
      </SafeAreaView>
    </Container>
  );
};

export default ChangePasswordForgotten;
