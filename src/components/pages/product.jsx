import {View, SafeAreaView, Text} from 'react-native';
import React from 'react';
import Container from '../microcomponents/container';
import ProductsBox from './productsBox';
import {useRoute} from '@react-navigation/native';
import {bgcolor, boxcolor} from '../colors';
import style from '../style';
import Back from '../microcomponents/Backicon';

const Product = () => {
  const route = useRoute();

  const product = route.params.product;
  return (
    <Container>
      <SafeAreaView style={{minHeight: '100%'}}>
        <View
          style={{
            height: 100,
            padding: 20,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor:'rgba(255,255,255,.5)',
            borderBottomWidth:.5
          }}>
          <Back />
          <Text style={[style.headingtext, {color: 'white'}]}>
            {product.product}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingLeft:20,
            paddingRight:20
          }}>
          <View
            style={[
              {
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              },
            ]}>
            <ProductsBox products={product} />
          </View>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Product;
