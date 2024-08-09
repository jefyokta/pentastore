import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import style from '../style';
import ServerUri from '../../const';
import axios from 'axios';
import {boxcolor, danger, info} from '../colors';
import {
  EyeIcon,
  ErrorIcon,
  EyeIcon2,
  EyeIcon3,
} from '../microcomponents/carticon/icon';
import Container from '../microcomponents/container';

const Registerpage = ({navigation}) => {
  const [username, setUsername] = useState(null);
  const [isDisable, setIsDisable] = useState(true);
  const [errmessage, setErrmessage] = useState(null);
  const [display ,setdisplay]= useState(true)

  const usernameValidator = (username, kind = 'Username') => {
    setUsername(username);
    if (username) {
      axios
        .get(`${ServerUri}/user?u=${username}`)
        .then(r => {
          if (r.data.status === 200) {
            setIsDisable(true);
            setdisplay(false)
            setErrmessage(`${kind} not available`);
          } else {
            setdisplay(true);
            setErrmessage(null);
            setIsDisable(false);
          }
        })
        .catch(e => console.log(e));
    } else {
      setIsDisable(true);
    }
  };

  return (
    <Container>

    <SafeAreaView>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          justifyContent: 'center',
          flexDirection: 'row',
          height: '100%',
          position: 'relative',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'center',
          }}>
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'transparent',
              width: '100%',
              height: 500,
              top: 0,
              paddingTop: 150,
              paddingLeft: 40,
            }}>
            <Text
              style={[style.headingtext, {fontWeight: '800', color: boxcolor}]}>
              Register to Pentastore
            </Text>
          </View>

          <View style={{width: '100%'}}>
            <Text style={{textAlign: 'center', marginBottom: 10}}>
              Enter your username
            </Text>
            <View style={{position: 'relative'}}>
              <TextInput
                placeholderTextColor={'rgba(255,255,255,0.5)'}
                value={username}
                placeholder="@username"
                onChangeText={text => {
                  usernameValidator(text, 'Username');
                }}
                style={style.inputstyle}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 25,
                  bottom: 20,
                  display: display ? 'none' : 'flex',
                  flexDirection:'row'
                }}>
                <Text style={{textAlign: 'center', color: danger, margin: 20 ,marginBottom:-10,position:'absolute',left:-180,top:-17}}>
                  {errmessage}
                </Text>
                <ErrorIcon />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[style.inputstyle2]}
              disabled={isDisable}
              onPress={() =>
                navigation.navigate('registerpage2', {username: username})
              }>
              <Text style={[style.buttonText, {color: 'black'}]}>Next</Text>
            </TouchableOpacity>
            <Text style={{textAlign: 'center' ,color:'white'}}>
              {' '}
              Already have an account ?
              <TouchableOpacity
                style={[style.style, {marginBottom: -3}]}
                onPress={() => navigation.replace('loginpage')}>
                <Text style={[style.register, {color: info}]}> Login</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
    </Container>
  );
};

const Registerpagev2 = ({navigation, route}) => {
  const Log = data => {
    axios
      .post(`${ServerUri}/user/login`, data)
      .then(r => navigation.replace('main'))
      .catch(e => alert('Username/Password salah!'));
  };
  const regist = async data => {
    try {
      const result = await axios.post(`${ServerUri}/user/register`, data);
      console.log(data);
      if (result) {
        alert('berhasil daftar');
        Log(data);
      }
    } catch (error) {
      alert('gagal! serper error cuy, pasti jepi lupa idupin serper lagi');
    }
  };

  const [email, setEmail] = useState(null);
  const [emailused, setEmailused] = useState(false);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfirmPassword] = useState(null);
  const [pwalert, setPwalert] = useState(null);
  const [errmessageemmail, setErrmessageemail] = useState(null);
  const [isDisable2, setIsDisable2] = useState(true);
  const [ismatch, setIsmatch] = useState(true);
  const [hide, sethide]= useState(true)
  const [hide2,sethide2]=useState(true)

  const userdata = {
    username: route.params.username,
    email,
    name,
    password,
  };

  const emailValidator = (username, kind = 'email') => {
    axios
      .get(`${ServerUri}/user/email?e=${username}`)
      .then(r => {
        if (r.data.status === 200) {
          setEmail(username);
          setEmailused(true);
          setErrmessageemail(`${kind} udah dipake`);
        } else {
          setErrmessageemail(null);
          setEmail(username);
          setEmailused(false);
        }
      })
      .catch(e => console.log(e));
  };
  const passwordValidator = input => {
    if (input !== password) {
      setPwalert('Password tidak cocok');
      setIsmatch(false);
    } else {
      setPwalert(null);
      setIsmatch(true);
    }
  };

  const formvalidator = (e, n, p, confirmp) => {
    if (e || !n || !p || !confirmp) {
      setIsDisable2(true);
    } else {
      setIsDisable2(false);
    }
  };
  useEffect(() => {
    formvalidator(emailused, name, password, ismatch);
  }, [emailused, name, password, ismatch]);

  return (
    <Container>
      <SafeAreaView style={{height: '100%'}}>
        <View
          style={{
            display: 'flex',
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{width: '100%'}}>
            <Text>{errmessageemmail}</Text>
            <TextInput
              placeholderTextColor={'rgba(255,255,255,0.5)'}
              placeholder="Email"
              value={email}
              onChangeText={text => emailValidator(text, 'email')}
              style={style.inputstyle}
            />

            <TextInput
              placeholderTextColor={'rgba(255,255,255,0.5)'}
              value={name}
              placeholder="Fullname"
              onChangeText={text => setName(text)}
              style={style.inputstyle}
            />
            <View style={{position: 'relative'}}>
              <TextInput
                placeholderTextColor={'rgba(255,255,255,0.5)'}
                placeholder="Password"
                value={password}
                secureTextEntry={hide}
                onChangeText={text => setPassword(text)}
                style={style.inputstyle}
              />
              <TouchableOpacity
                style={{position: 'absolute', right: 25, bottom: 20}}
                onPress={() => sethide(!hide)}>
                {hide && <EyeIcon />}
                {!hide && <EyeIcon3 />}
              </TouchableOpacity>
            </View>
            <View>
              <TextInput
                placeholderTextColor={'rgba(255,255,255,0.5)'}
                placeholder="Confirm Password"
                value={confirmpassword}
                secureTextEntry={hide2}
                onChangeText={text => passwordValidator(text)}
                style={style.inputstyle}
              />
              <TouchableOpacity
                style={{position: 'absolute', right: 25, bottom: 20}}
                onPress={() => sethide2(!hide2)}>
                {hide2 && <EyeIcon />}
                {!hide2 && <EyeIcon3 />}
              </TouchableOpacity>
            </View>
            <Text style={{color: 'red'}}>{pwalert}</Text>
            <TouchableOpacity
              style={[style.inputstyle2]}
              disabled={isDisable2}
              onPress={() => regist(userdata)}>
              <Text style={[style.buttonText, {color: 'black'}]}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export {Registerpage, Registerpagev2};
