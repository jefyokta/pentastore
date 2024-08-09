import {
  SafeAreaView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import style from '../style';
import {boxcolor} from '../colors';
import {useEffect, useState} from 'react';
import axios from 'axios';
import ServerUri from '../../const';
import {ErrorIcon} from '../microcomponents/carticon/icon';
import {danger} from '../colors';
import {useNavigation} from '@react-navigation/native';
import Container from '../microcomponents/container';
const ForgotPass = () => {
  const navigation = useNavigation();
  const [disabled, setdisbled] = useState(true);
  const [text, settext] = useState('');
  const [display, setdisplay] = useState(false);
  const errmessage = 'Username not found';

  const sendverificationmail = async () => {
    try {
      const result = await axios.post(`${ServerUri}/user/forgotpassword`, {
        user: text,
      });
      console.log(result.data.msg);
      navigation.navigate('verifycode', {
        username: text,
        message: result.data.msg,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getusername = async () => {
      try {
        console.log(text);
        const result = await axios.get(`${ServerUri}/user?u=${text}`);
        console.log(result.data);
        if (result.data.status === 404 ) {
          setdisbled(true);
          setdisplay(true);
        }  else {
          setdisplay(false);
          setdisbled(false);
        }
      } catch (error) {
        setdisbled(true);
        console.log(error);
      }
    };
    getusername();
  }, [text]);
  return (
    <Container>
      <SafeAreaView>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              position: 'relative',
            }}>
            <TextInput
              style={[style.inputstyle, {width: '90%'}]}
              placeholder="Your username"
              onChangeText={text => settext(text)}
              value={text}
              placeholderTextColor={'rgba(255,255,255,.5)'}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 25,
                bottom: 20,
                display: display ? 'flex' : 'none',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: danger,
                  margin: 20,
                  marginBottom: -10,
                  position: 'absolute',
                  left: -180,
                  top: -17,
                }}>
                {errmessage}
              </Text>
              <ErrorIcon />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              style.inputstyle2,
              {width: '90%'},
            ]}
            onPress={sendverificationmail}
            disabled={disabled}>
            <Text style={[style.buttonText, {color: 'white'}]}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default ForgotPass;
