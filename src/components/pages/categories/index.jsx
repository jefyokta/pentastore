import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import Container from '../../microcomponents/container';
import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import ServerUri from '../../../const';
import ProductsBox from '../productsBox';
import {bgcolor, boxcolor, info} from '../../colors';
import {TextLight} from '../../microcomponents/Text';
import Back from '../../microcomponents/Backicon';

const Category = () => {
  const route = useRoute();
  const [product, setProduct] = useState(null);
  const category = route.params.category;

  useEffect(() => {
    const cats = async () => {
      const result = await axios.get(`${ServerUri}/product/${category}`);
      if (result) {
        setProduct(result.data);
        // console.log(result.data[0])
      }
    };
    cats();
  }, []);

  return (
    <Container>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              borderBottomWidth: 0.17,
              borderBottomColor: 'white',
              padding: 20,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                // alignItems: 'center',
              }}>
              <Back />
              <Text
                style={{
                  textTransform: 'capitalize',
                  fontSize: 25,
                  fontWeight: 900,
                  marginBottom: 5,
                  color: info,
                }}>{`${category} products`}</Text>
            </View>
          </View>
          <View style={{padding: 20}}>
            {product &&
              product.map((pro, i) => {
                return <ProductsBox products={pro} key={i} />;
              })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};
export default Category;
