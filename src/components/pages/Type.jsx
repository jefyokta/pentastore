import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import Container from '../microcomponents/container';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import ServerUri from '../../const';
import {useEffect, useState} from 'react';
import ProductsBox from './productsBox';
import Back from '../microcomponents/Backicon';
import style from '../style';

const Type = () => {
  const route = useRoute();
  const nav = useNavigation();
  const type = route.params.type;
  if (!type) nav.goBack();
  const [product, setproducts] = useState();

  useEffect(() => {
    axios
      .get(`${ServerUri}/product/type?type=${type}`)
      .then(result => setproducts(result.data))
      .catch(e => console.log(e));
  }, []);

  return (
    <Container>
      <SafeAreaView>
        <ScrollView style={{minHeight: '100%'}}>
          <View
            style={{
              height: 100,
              padding: 20,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor:'rgba(255,255,255,.5)',borderBottomWidth:.5
            }}>
            <Back />
            <Text
              style={[
                style.headingtext,
                {color: 'white', textTransform: 'capitalize'},
              ]}>
              {type}
            </Text>
          </View>
          <View>
            {product &&
              product.map((pro, i) => {
                return (
                  <View key={i} style={{padding: 20}}>
                    <ProductsBox products={pro} />
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default Type;
