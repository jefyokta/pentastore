import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import ServerUri, { ImgUri } from '../../const';
import {getToken} from '../../sessionmanager';
import PaymentHandler from '../Webview';
import {boxcolor, danger, info} from '../colors';
import style from '../style';
import {useNavigation} from '@react-navigation/native';
import PentaIcon from '../microcomponents/carticon';
import PentaLoading from '../microcomponents/Pentaload';
import Back from '../microcomponents/Backicon';
import Container from '../microcomponents/container';

const Cart = () => {
  const nav = useNavigation();
  const [data, setdata] = useState([]);
  const [token, setToken] = useState(null);
  const [showmodal, setshowmodal] = useState(false);
  const [user, setUser] = useState({
    name:'jefyokta',
    id:5,
    email:'jefyokta@icloud.com'
  });
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const getUserData = async () => {
      setloading(true);
      const accesstoken = await getToken();
      setloading(false);
      if (accesstoken) {
        const {data} = await axios.get(`${ServerUri}/user/mydata`, {
          headers: `Authorization : Bearer ${accesstoken}`,
        });
        console.log(data);
        setUser(data);
      } else {
        nav.replace('loginpage');
      }
    };
    getUserData();
  }, []);

  const removeCart = async id => {
    const willberemoved = id;
    // console.log(id);
    const carts = await AsyncStorage.getItem('@keranjang');
    const cart = JSON.parse(carts);
    const catss = cart.filter(item => item !== willberemoved);

    const newcarts = await AsyncStorage.setItem(
      '@keranjang',
      JSON.stringify(catss),
    );
    // console.log(newcarts);
  };
  const getCarts = async () => {
    const carts = await AsyncStorage.getItem('@keranjang');
    // console.log(carts);

    if (carts) {
      const cart = JSON.parse(carts);
      // console.log(typeof cart);
      let array = [];
      for (let i = 0; i < cart.length; i++) {
        const result = await axios.get(
          `${ServerUri}/product/get?id=${cart[i]}`,
        );
        array.push(result.data);
        // console.log(result.data);
      }
      // console.log(array);
      setdata(array);
    }
  };
  const show = () => {
    setshowmodal(true);
  };
  const close = () => {
    setshowmodal(false);
  };
  const checkout = async product => {
    setloading(true);
    const result = await axios.post(`${ServerUri}/transaction`, {
      product: product.product,
      id: product.id,
      harga: product.harga,
      name: user.nama,
      email: user.email,
      userid: user.id,
    });
    setloading(false);
    setToken(result.data);
  };

  useEffect(() => {
    getCarts();
  }, [data]);

  return (
    <Container>
      <SafeAreaView style={{minHeight: '100%'}}>
        <PentaLoading show={loading} />
        <View
          style={{
            padding: 20,
            height: 100,
            width: '100%',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Back nav={nav} />
            <Text style={style.headingtext}>
              MyCart
              {'  '}
              <PentaIcon fillw="white" />
            </Text>
          </View>
        </View>
        <View style={{padding: 10}}>
          {data &&
            data.map((product, i) => {
              return (
                <View
                  key={i}
                  style={{
                    borderWidth: 1,
                    margin: 5,
                    padding: 10,
                    borderRadius: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    position: 'relative',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.5)',
                  }}>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: -5,
                      top: -5,
                      width: 20,
                      height: 20,
                      borderRadius: 50,
                      // borderWidth: 0.5,
                      backgroundColor: danger,
                      justifyContent: 'center',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onPress={() => removeCart(product.id)}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: '900',
                        color: 'white',
                      }}>
                      X
                    </Text>
                  </TouchableOpacity>
                  <View>
                    <Image
                      source={{
                        uri: `${ImgUri}public/img/` + product.gambar,
                      }}
                      style={{width: 50, height: 50}}
                    />
                    <Text style={{color: 'white'}}>{product.product}</Text>
                    <Text style={{color: 'white'}}>
                      Rp {new Intl.NumberFormat('id-ID').format(product.harga)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      checkout(product);
                      show();
                    }}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 5,
                      backgroundColor: info,
                      borderRadius: 5,
                      alignSelf: 'center',
                      marginRight: 20,
                    }}>
                    <Text>checkout</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          {!data ||
            (data.length < 1 && (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color:'white'}}>Your Cart is empty</Text>
              </View>
            ))}
        </View>
        <PaymentHandler token={token} visible={showmodal} onclose={close} />
      </SafeAreaView>
    </Container>
  );
};

export default Cart;
