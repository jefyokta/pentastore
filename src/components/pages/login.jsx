import React, {useEffect, useState} from 'react';
import {
  InputAccessoryView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import style from '../style';
import ServerUri from '../../const';
import Container from '../microcomponents/container';
import {boxcolor, danger, info} from '../colors';
import {
  ErrorIcon,
  EyeIcon,
  EyeIcon2,
  EyeIcon3,
} from '../microcomponents/carticon/icon';
const Loginpage = ({navigation}) => {
  const [username, setUsername] = useState(null);
  const [usernamek, setUsernamek] = useState(null);
  const [password, setPassword] = useState(null);
  const [disabled, setdisbled] = useState(true);
  const [hide, sethide] = useState(true);

  useEffect(() => {
    setUsernamek(username);
  }, [username]);
  const data = {
    username: usernamek,
    password: password,
  };

  useEffect(() => {
    const validator = () => {
      if (!username == '' || !password == '') {
        setdisbled(false);
      } else {
        setdisbled(true);
      }
    };
    validator();
  }, [username, password]);

  const Log = () => {
    axios
      .post(`${ServerUri}/user/login`, data)
      .then(r => {
        alert(`Selamat Datang ${data.username}`);
        navigation.replace('main');
      })
      .catch(e => {
        console.log(e.response.status);
        if (
          e.response.status !== 500 ||
          e.response.status !== 430 ||
          e.response.status == 404
        ) {
          alert('Username/Password salah!');
        } else if (e.response.status == 430) {
          alert('Something went Wrong, please try again later');
        }
      });
  };
  return (
    <View>
      <Container>
        <SafeAreaView>
          <>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100%',
                padding: 20,
              }}>
              <View style={{position: 'relative'}}>
                <TextInput
                  placeholderTextColor={'rgba(255,255,255,0.5)'}
                  value={username}
                  placeholder="@Username"
                  onChangeText={setUsername}
                  style={style.inputstyle}
                />
              </View>
              <View style={{position: 'relative'}}>
                <TextInput
                  placeholderTextColor={'rgba(255,255,255,0.5)'}
                  value={password}
                  placeholder="Password"
                  secureTextEntry={hide}
                  onChangeText={setPassword}
                  style={style.inputstyle}
                />
                <TouchableOpacity
                  style={{position: 'absolute', right: 25, bottom: 20}}
                  onPress={() => sethide(!hide)}>
                  {hide && <EyeIcon />}
                  {!hide && <EyeIcon3 />}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[style.inputstyle2]}
                onPress={Log}
                disabled={disabled}>
                <Text style={[style.buttonText, {color: 'white'}]}>Login</Text>
              </TouchableOpacity>

              <Text style={style.register}>
                {' '}
                Have no account ?
                <TouchableOpacity
                  style={[style.register, {marginTop: -3}]}
                  onPress={() => navigation.replace('registerpage')}>
                  <Text style={[style.register, {color: info}]}> Register</Text>
                </TouchableOpacity>
              </Text>
              <Text style={style.register}>
                {' '}
                Forgot Your password?
                <TouchableOpacity
                  style={[style.register, {marginTop: 0}]}
                  onPress={() => navigation.navigate('forgotpass')}>
                  <Text style={[style.register, {color: info}]}>
                    {' '}
                    Here to go
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          </>
        </SafeAreaView>
      </Container>
    </View>
  );
};

export default Loginpage;
