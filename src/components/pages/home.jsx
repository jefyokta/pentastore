import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import Header from './header';
import ProducsList from './productlist';
import axios from 'axios';
import Box from '../microcomponents/Box';
import style from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {bgcolor, boxcolor, info, kuning, pentared, third} from '../colors';
import {TextLight} from '../microcomponents/Text';
import Container from '../microcomponents/container';
import HorizontalScroll from '../microcomponents/HorizontalScroll';
import ServerUri from '../../const';
import CategoryButton from '../microcomponents/categoriesbutton';
import {CatBox} from './search';
import {DefaulPro} from '../../const/default';
import { CartCheck } from '../microcomponents/carticon/icon';

const Home = ({navigation}) => {
  const [jumlahkeranjang, setjumlahkeranjang] = useState(null);
  const [popular, setpopular] = useState([DefaulPro]);
  const [newest, setnewest] = useState([DefaulPro]);

  useEffect(() => {
    const cats = async () => {
      const result = await axios.get(`${ServerUri}/product/popular`);
      if (result) {
        // console.log(result.data)
        setpopular(result.data);
      }
    };
    cats();
    console.log(popular);
  }, []);
  useEffect(() => {
    const cat = async () => {
      const result = await axios.get(`${ServerUri}/product/newest`);
      if (result) {
        console.log(result.data);
        setnewest(result.data);
      }
    };
    cat();
  }, []);
  // console.log(newest)

  const getKeranjang = async () => {
    const hasil = await AsyncStorage.getItem('@keranjang');
    if (hasil) {
      const keranjang = JSON.parse(hasil);
      const jml = keranjang.length > 99 ? '99+' : `${keranjang.length}`;
      setjumlahkeranjang(jml);
    } else {
      setjumlahkeranjang('0');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getKeranjang();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <SafeAreaView>
        <ScrollView>
          <Header navigation={navigation} jumlahkeranjang={jumlahkeranjang} />
          <View>
            <>
              <CatBox />
              <CategoryButton text={'Popular'} nav={'popular'} />

              <HorizontalScroll>
                <View style={style.horizontalscroll}>
                  {popular &&
                    popular.map((product, i) => {
                      return (
                        <Box
                          key={i}
                          img={product.gambar}
                          func={() =>
                            navigation.navigate('product', {product: product})
                          }>
                          <View
                            style={{
                              padding: 10,
                              // alignItems: 'end',
                              display: 'flex',
                              alignSelf: 'flex-end',
                              width: '100%',
                              backgroundColor: 'rgba(0,0,0,0.5)',
                              flexDirection: 'row',
                              // maxHeight: 50,
                              justifyContent: 'space-between',
                            }}>
                            <View style={{width: '75%', paddingLeft: 10}}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  fontSize: 16,
                                  color: third,
                                }}
                                numberOfLines={1}
                                ellipsizeMode="tail">
                                {product.product}
                              </Text>

                              <Text style={{color: 'white'}}>
                                {'Rp ' +
                                  new Intl.NumberFormat('id-ID').format(
                                    product.harga,
                                  )}
                              </Text>
                            </View>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                position: 'relative',
                                alignItems: 'center',
                              }}>
                              <CartCheck />
                              <Text style={{color: kuning, marginBottom: -10}}>
                                {product.ordered}x
                              </Text>
                            </View>
                          </View>
                        </Box>
                      );
                    })}
                </View>
              </HorizontalScroll>
            </>

            <CategoryButton text={'Newest'} nav={'newest'} />

            <HorizontalScroll>
              <View
                style={[
                  style.horizontalscroll,
                  {backgroundColor: 'transparent'},
                ]}>
                {newest &&
                  newest.map((product, i) => {
                    return (
                      <Box
                        key={i}
                        img={product.gambar}
                        func={() =>
                          navigation.navigate('product', {product: product})
                        }>
                        <View
                          style={{
                            padding: 10,
                            // alignItems: 'end',
                            display:'flex',
                            alignSelf: 'flex-end',
                            width: '100%',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            flexDirection:'row',
                            // maxHeight: 50,
                            justifyContent:'space-between'
                          }}>
                          <View style={{width:'75%',paddingLeft:10}}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                color: third,
                              }}
                              numberOfLines={1}
                              ellipsizeMode="tail">
                              {product.product}
                            </Text>

                            <Text style={{color: 'white'}}>
                              {'Rp ' +
                                new Intl.NumberFormat('id-ID').format(
                                  product.harga,
                                )}
                            </Text>
                          </View>
                          <View style={{display:"flex",flexDirection:'row',position:'relative',alignItems:'center'}}>
                            <CartCheck />
                            <Text style={{color:kuning,marginBottom:-10}}>{product.ordered}x</Text>
                          </View>

                        </View>
                      </Box>
                    );
                  })}
              </View>
            </HorizontalScroll>

            <View style={{backgroundColor: 'transparent'}}>
              <CategoryButton text={'All products'} nav={''} />
              <ProducsList limit="" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default Home;
