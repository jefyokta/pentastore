import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {getToken} from '../../sessionmanager';
import ServerUri from '../../const';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Container from '../microcomponents/container';

import CategoryButton from '../microcomponents/categoriesbutton';
import Orderlisted from '../microcomponents/orderlisted';
import HeaderBack from '../microcomponents/HeaderBack';
const Orderlist = () => {
  const nav = useNavigation();
  const [jumlahkeranjang, setjumlahkeranjang] = useState(null);
  const [userid, setuserid] = useState();
  const [products, setproducts] = useState([]);
  const [option, setoption] = useState('');
  const [tokens, settoken] = useState();

  useEffect(() => {
    const gettoken = async () => {
      const token = await getToken();
      settoken(token);
      // console.log(tokens)
    };
    const mydata = async () => {
      try {
        const res = await axios.get(`${ServerUri}/user/mydata`);
        // console.log(res.data.id);
        setuserid(res.data.id);
      } catch (error) {
        // console.log(error.response.status)
        if (error.response.status ==401) {
          nav.replace("loginpage")
          
        }else{
          alert("Something went Wrong, Please try again Later")
        }
      }
    };
    mydata();
    gettoken();
  }, []);

  useEffect(() => {
    const getmyorder = async () => {
      try {
        const result = await axios.get(
          `${ServerUri}/transaction/userorder?userid=${userid}`,
        );
        setproducts(result.data);
        console.log(result.data[0])
      } catch (error) {
        setproducts(false);
        console.error(error);
      }
    };
    getmyorder();
  }, [userid]);



  return (
    <>
      <Container otherstyle={{minHeight: '100%'}}>
        <SafeAreaView>
          <>

            <View style={{padding: 0, minHeight: '100%'}}>
              <HeaderBack text={'OrderList'}/>
              <CategoryButton text={'Your Order(s)'} />

              <View style={{padding: 0}}>
  <Orderlisted products={products}/>
              </View>
            </View>
          </>
        </SafeAreaView>
      </Container>
    </>
  );
};

export default Orderlist;
