import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Linking,
} from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import Container from '../microcomponents/container';
import HeaderBack from '../microcomponents/HeaderBack';
import PentaLoading from '../microcomponents/Pentaload';
import ServerUri from '../../const';
import {info, kuning, third} from '../colors';
import {GetDifDay} from '../Functions';
import PaymentHandler from '../Webview';

const OrderDetails = () => {
  const route = useRoute();
  const nav = useNavigation();
  const orderid = route.params.orderid;
  //   const product = route.params.product

  if (!orderid) {
    nav.goBack();
    return null;
  }

  const [product, setProduct] = useState({
    id: 'id',
    harga: 20000,
    token: 'token',
    status: 1,
    product: 'productfsdfdsvgdsvsdfsdfsdfefsfsafaf',
    link: 'https;////',
    gambar: 'default/jepi1',
    desc: null,
    type: 'apple',
    tech: 'reactnative',
    total: 20000,
    tanggalpembelian: '2024-05-19T10:10:10',
  });
  const [show, setShow] = useState(false);
  const [modal, setmodal] = useState(false);
  const [token, settoken] = useState(null);
  const handlepayment = token => {
    setmodal(true);
    settoken(token);
  };
    const close = () => {
      setmodal(false);
    };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await axios.get(
          `${ServerUri}/transaction/order?orderid=${orderid}`,
        );
        setProduct(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, []);

  if (!product) {
    return <PentaLoading show={show} />;
  }

  return (
    <Container style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <HeaderBack text="Order Details" />
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.title}>Order</Text>
            <Text style={styles.subtitle}>ID #{orderid}</Text>
          </View>
          <View style={styles.detailContainer}>
            <>
              <DetailRow label="Product" value={product.product} />
              <DetailRow
                label="Price"
                value={`Rp ${new Intl.NumberFormat('id-ID').format(
                  product.harga,
                )}`}
              />
              <DetailRow
                label="CreateAt"
                value={`${GetDifDay(
                  product.tanggalpembelian.split('T')[0],
                )} at ${product.tanggalpembelian.split('T')[1].split(':')[0]}:${
                  product.tanggalpembelian.split('T')[1].split(':')[1]
                } UTC`}
              />
              <DetailRow
                label="Token"
                value={product.token}
                numberOfLines={3}
              />
              <DetailRow
                label="Payment Url"
                value={`https://app.sandbox.midtrans.com/snap/v3/redirection/${product.token}`}
                numberOfLines={6}
              />
              <DetailRow
                label="Status"
                value={product.status === 1 ? 'success' : 'waiting'}
              />
              <DetailRow label="Payment Gateway" value="Midtrans (sandbox)" />
              <DetailRow
                label="Payment Method"
                value="Not part of this document"
              />
              {product.status ? (
                <TouchableOpacity
                  style={styles.payButton}
                  // onPress={async () => await Linking.openURL(product.link)}
                  >
                  <Text style={styles.payButtonText}>Download</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.payButton2}
                  onPress={()=>handlepayment(product.token)}>
                  <Text style={styles.payButtonText}>Pay</Text>
                </TouchableOpacity>
              )}
            </>

            {!product && <DetailRow label={''} value={''} />}
          </View>
        </View>
        <PaymentHandler visible={modal} token={token} onclose={close}/>
        <PentaLoading show={show} />
      </SafeAreaView>
    </Container>
  );
};

const DetailRow = ({label, value, numberOfLines = 1}) => (
  <View style={styles.detailRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value} numberOfLines={numberOfLines}>
      : {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
  },
  safeArea: {
    minHeight: '100%',
  },
  contentContainer: {
    minHeight: '70%',
    margin: 10,
    backgroundColor: 'rgba(255,255,255,.1)',
    borderRadius: 20,
    padding: 10,
    paddingTop: 30,
  },
  title: {
    color: kuning,
    fontSize: 24,
    fontWeight: '600',
    margin: 10,
  },
  subtitle: {
    color: info,
    fontSize: 16,
    margin: 10,
  },
  detailContainer: {
    backgroundColor: 'rgba(255,255,255,.1)',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    color: 'white',
    width: 90,
  },
  value: {
    fontSize: 14,
    color: 'white',
    flex: 1,
  },
  payButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: third,
    borderRadius: 10,
    alignItems: 'center',
  },
  payButton2: {
    marginTop: 20,
    padding: 10,
    backgroundColor: kuning,
    borderRadius: 10,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OrderDetails;
