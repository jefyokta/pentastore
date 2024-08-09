import {View, SafeAreaView, Text} from 'react-native';
import Container from '../microcomponents/container';
import PentaLoading from '../microcomponents/Pentaload';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import ServerUri from '../../const';

const Process = () => {
  const route = useRoute();
  const nav = useNavigation();
  const orderid = route.params.orderid;
  const product = route.params.product;
  const [show, setShow] = useState(false);


  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setShow(true);
      const result =  await axios.get(`${ServerUri}/transaction/getstatus?id=${orderid}`);
        setShow(false);
       nav.replace('orderdetails', {orderid: orderid, product: result});

      } catch (error) {
        console.error(error.response?.status, error);
        if (error.response.status == 404) {
              setShow(false);
            nav.replace('orderdetails', {orderid: orderid, product: product});
            
        }
      }
    };
    fetchStatus();
  }, []);


  return (
    <Container>
      <SafeAreaView style={{minHeight: '100%'}}>
        <PentaLoading show={show} />
      </SafeAreaView>
    </Container>
  );
};

export default Process;
