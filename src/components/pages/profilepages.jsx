import React, {useState, useEffect, Children} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Modal,
  ImageBackground,
  Dimensions,
  FlatList,
} from 'react-native';
import {
  bgcolor,
  boxcolor,
  danger,
  primary,
  secondary,
  info,
  kuning,
  success,
  third,
} from '../colors';
import Container from '../microcomponents/container';
import {getCrosstoken, getToken} from '../../sessionmanager';
import axios from 'axios';
import ServerUri, {ImgUri} from '../../const';
import {useNavigation} from '@react-navigation/native';
import style from '../style';
import PentaLoading from '../microcomponents/Pentaload';
import {pickSingle, types} from 'react-native-document-picker';
import HorizontalScroll from '../microcomponents/HorizontalScroll';
import {
  EmptyIcon,
  MailIcon,
  PersonIcon,
  ProfileIcon,
  SettingIcon,
  AddIcon,
  PowerIcon,
} from '../microcomponents/carticon/icon';
import {GetDifDay, kalender} from '../Functions';

const Profilepages = ({navigation}) => {
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  console.log(width);
  const nav = useNavigation();

  const defaultprofile = [
    'jepi1.png',
    'jepi2.png',
    'jepi3.png',
    'jepi4.png',
    'jepi5.png',
    'jepi6.png',
    'jepi7.png',
  ];
  const host = `${ImgUri}/public/img/`;
  const [local, setlocal] = useState(host);
  const [user, setUser] = useState({
    username: 'Guest',
    nama: 'Guest of pentastore',
    email: 'pentaguest@gmail.com',
    createat: 'adsadTdsakd',
    gambar: 'profile.png',
    role: false,
  });
  const flatarr = [
    {id: 1, route: '', svg: PersonIcon, title: user.nama},
    {id: 2, route: '', svg: MailIcon, title: user.email},
    {
      id: 3,
      route: '',
      svg: EmptyIcon,
      title: `Join On : ${GetDifDay(user.createat.split('T')[0])}`,
    },
    {
      id: 4,
      route: '',
      svg: EmptyIcon,
      title: user.role ? 'Admin of pentastore' : 'Costumer of pentastore',
    },
  ];
  const [isDefault, setIsDefault] = useState(true);
  const [loading, setloading] = useState(false);
  const [show, setshow] = useState(false);
  const [showfoto, setshowfoto] = useState(false);
  const [foto, setfoto] = useState(user.gambar);
  const [file, setfile] = useState();

  const getfile = async () => {
    try {
      const doc = await pickSingle({
        presentationStyle: 'fullScreen',
        type: types.images,
      });
      setfile(doc);
      handlefotochanged(doc.uri, '', false);
      console.log(file);
    } catch (error) {
      console.log(error);
    }

    // alert('fixing, will available soon!')
  };
  const handlefotochanged = (local, foto, isDef) => {
    setfoto(foto);
    setlocal(local);
    setIsDefault(isDef);
    console.log(file);
  };
  const ChangePhoto = async () => {
    try {
      if (isDefault) {
        const gambar = foto;
        setloading(true);
        const r = await axios.post(`${ServerUri}/user/updatephotodefault`, {
          gambar: `${gambar}`,
        });
        console.log(r.status);
        if (r.status == 200) {
          setloading(false);
          setshowfoto(false);
          alert('profile Photo changed');
        }
      } else {
        // updot baru
        if (!file) return;
        const form = new FormData();
        const path = file.uri;
        let uri = file.uri;
        if (file.uri.startsWith('file://')) {
          uri = file.uri.replace('file://', '');
        }
        form.append('file', {
          uri: uri,
          name: file.name,
          type: file.type,
        });
        form.append('user', {
          username: user.username,
        });
        const acctoken = await getToken();
        try {
          const response = await axios.post(`${ImgUri}api/updateimage`, form, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: acctoken,
            },
          });
          alert('berhasil');
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      setloading(false);
    } catch (error) {
      console.log(error);
      // setloading(false);
      alert('Failed to Update profile');
      setshowfoto(false);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const accesstoken = await getToken();
        if (accesstoken) {
          const {data} = await axios.get(`${ServerUri}/user/mydata`, {
            headers: `Authorization : Bearer ${accesstoken}`,
          });
          if (!data) {
            nav.replace('loginpage');
          }
          console.log(data);
          setUser(data);
          setfoto(data.gambar);
        } else {
          alert('You need to login first');
          nav.replace('loginpage');
        }
      } catch (error) {
        alert('You need to login first');

        nav.replace('loginpage');
      }
    };
    getUserData();
  }, []);
  const Logout = async () => {
    try {
      const out = await axios.delete(`${ServerUri}/user/logout`);
      if (out) {
        // apus taimaut nya pas prodaksyion
        // #needtoremove
        setTimeout(() => {
          setloading(false);
          nav.replace('loginpage');
        }, 2000);
      } else {
        alert('gagal logout');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openurl = async () => {
    const tok = await getCrosstoken();
    await Linking.openURL(`https://penta.store/api/oauth?token=${tok}`);
  };

  return (
    <Container>
      <SafeAreaView style={{height, position: 'relative'}}>
        <View
          style={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 20,
          }}>
          <View style={{zIndex: 9}}>
            <View>
              <TouchableOpacity
                onPress={() => setshowfoto(!showfoto)}
                style={{zIndex: 2}}>
                <Image
                  source={{uri: `${local}${foto}`}}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 100,
                    borderWidth: 4,
                    borderColor: 'rgba(255,255,255,.5)',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    zIndex: 2,
                  }}
                  // resizeMode='contain'
                />
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 25,
                  color: kuning,
                  fontWeight: 'bold',
                }}>
                @{user.username}
              </Text>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: 10,
              zIndex: 9999999,
              // width: 50,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setshow(true)}
              style={{marginRight: 10}}>
              <PowerIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => nav.navigate('setting')}>
              <SettingIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            padding: 10,
            position: 'absolute',
            width: Dimensions.get('screen').width,
            bottom: 250,
            zIndex: -1,
          }}>
          <View
            style={{
              // borderWidth: 1,
              paddingBottom: 0,
              backgroundColor: 'rgba(252, 202, 224, 0.1)',
              borderRadius: 10,
              // borderColor: 'rgba(252, 202, 224, 0.2)',
              height: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'column',
              padding: 10,
              // position:'absolute',
              position: 'relative',
              transform: [{translateY: 50}],
            }}>
            <View
              style={{
                width: '100%',
                height: 480,
                backgroundColor: 'rgba(252, 255, 255, 0.1)',
                margin: 50,
                marginBottom: 20,
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'center',
                position: 'absolute',
                top: -80,
              }}>
              <View
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  borderColor: 'white',
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 20,
                }}>
                <Flat title={flatarr[0].title} TheSvg={flatarr[0].svg} />
                <Flat title={flatarr[1].title} TheSvg={flatarr[1].svg} />
                <Flat title={flatarr[2].title} TheSvg={flatarr[2].svg} />
                <Flat
                  title={flatarr[3].title}
                  TheSvg={flatarr[3].svg}
                  colors={third}
                />
              </View>
              {user.role && (
                <View
                  style={{
                    marginTop: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    padding: 4,
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'rgba(39,255,255,.4)',
                      padding: 10,
                      borderRadius: 5,
                    }}
                    onPress={openurl}>
                    <Text style={{color: 'white', textAlign: 'center'}}>
                      Go to Admin Dashboard
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <View
                style={{
                  marginBottom: 10,
                  paddingLeft: 15,
                  paddingRight: 15,
                  padding: 4,
                }}></View>
            </View>
            <Text style={{color: 'rgba(255,255,255,.5)', padding: 10}}>
              &copy; Oktaax org, Pentastore {kalender.getyear()}
            </Text>
          </View>
        </View>

        {/* modal */}
        <Modal
          visible={show}
          transparent={true}
          onRequestClose={!show}
          animationType="slide">
          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              borderRadius: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              position: 'absolute',
              bottom: -20,
              height: '30%',
              padding: 20,
            }}>
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={[
                    style.headingtext,
                    {
                      color: boxcolor,
                      fontFamily: 'Arial',
                      borderBottomWidth: 1,
                      borderBottomColor: boxcolor,
                      padding: 5,
                    },
                  ]}>
                  Wanna logout?
                </Text>
                <TouchableOpacity onPress={() => setshow(false)}>
                  <Text style={{fontWeight: '900'}}>X</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => setshow(false)}
                  style={{
                    borderWidth: 2,
                    borderColor: info,
                    borderRadius: 10,
                    padding: 20,
                    margin: 20,
                    marginBottom: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    No, i want to stay
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    setshow(false);
                    setloading(true);
                    await Logout();
                  }}
                  style={{
                    borderWidth: 2,
                    borderColor: danger,
                    borderRadius: 10,
                    padding: 20,
                    margin: 20,
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    {'Yep :('}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={showfoto}
          transparent={true}
          onRequestClose={!showfoto}
          animationType="slide">
          <View
            style={{
              width: '100%',
              backgroundColor: 'rgba(255,255,255,.9)',
              borderRadius: 20,
              position: 'absolute',
              bottom: -10,
              height: '30%',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(200,200,255,.2)',
                borderRadius: 10,
                padding: 20,
                width: '100%',
              }}>
              <Text style={{color: 'black'}}>
                Choose Your New Profile Photo
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setshowfoto(!showfoto);
                  setloading(false);
                }}>
                <Text style={{color: danger, fontWeight: '900', fontSize: 20}}>
                  &#10005;
                </Text>
              </TouchableOpacity>
            </View>
            <HorizontalScroll
              style={{
                marginBottom: 0,
                backgroundColor: 'rgba(0,0,50,.1)',
              }}>
              {defaultprofile.map((p, index) => (
                <View
                  key={index}
                  style={{
                    width: 'auto',
                    height: 'auto',
                    margin: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      handlefotochanged(`${ImgUri}/public/img/`, `default/${p}`)
                    }
                    style={{
                      overflow: 'hidden',
                      borderRadius: 20,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 5,
                    }}>
                    <Image
                      source={{uri: `${ImgUri}/public/img/default/${p}`}}
                      style={{
                        width: 100,
                        height: 100,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ))}
              <View
                style={{
                  width: 'auto',
                  height: 'auto',
                  margin: 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.55,
                  shadowRadius: 4,
                  elevation: 5,
                }}>
                <TouchableOpacity
                  onPress={async () => await getfile()}
                  style={{
                    overflow: 'hidden',
                    borderRadius: 20,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                    backgroundColor: 'rgba(255,255,255,.5)',
                    width: 100,
                    height: 100,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AddIcon />
                </TouchableOpacity>
              </View>
            </HorizontalScroll>
            <TouchableOpacity
              onPress={async () => await ChangePhoto()}
              style={{
                backgroundColor: '#388696',
                width: '90%',
                height: 40,
                marginBottom: 10,
                padding: 10,
                borderRadius: 20,
                position: 'absolute',
                bottom: 30,
                right: 22,
                // left:0
              }}>
              <Text style={{color: 'white', textAlign: 'center'}}>Save </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <PentaLoading show={loading} />
      </SafeAreaView>
    </Container>
  );
};

const Flat = ({title, TheSvg, colors = 'white'}) => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(255,255,255,.1)',
        margin: 0.5,
        height: 40,
        padding: 10,
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
      }}>
      <TheSvg />
      <Text style={{color: colors, marginLeft: 10}}>{title}</Text>
    </View>
  );
};
export default Profilepages;
