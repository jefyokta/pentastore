import {View, FlatList, Text, Image, TouchableOpacity} from 'react-native';
import {info, kuning, success, third} from '../../colors';
import {useNavigation} from '@react-navigation/native';
import { ImgUri } from '../../../const';

const Orderlisted = ({products}) => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(255,255,255,.1)',
        paddingBottom: 70,
        borderRadius: 10,
        height: '90%',
        margin: 10,
        padding: 10,
      }}>
      <FlatList
        data={products}
        renderItem={({item}) => <Item product={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const Item = ({product}) => {
  const contheight = 90;
  const nav = useNavigation();
  if (!product) {
    return (
      <Text style={{textAlign: 'center', color: 'white'}}>
        You have no order on process
      </Text>
    );
  }
  return (
    <View
      style={{
        backgroundColor: 'rgba(255,255,255,.1)',
        borderRadius: 10,
        padding: 0,
        margin: 5,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: contheight,
          width: 'auto',
        }}>
        <Image
          source={{uri: `${ImgUri}/public/img/${product.gambar}`}}
          width={contheight}
          height={contheight}
        />
        <View
          style={{
            margin: 5,
            display: 'flex',
            justifyContent: 'space-between',
            width: 150,
          }}>
          <View>
            <Text
              style={{
                color: kuning,
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 5,
              }}
              numberOfLines={1}>
              {product.product}
            </Text>
            <Text style={{color: 'white'}} numberOfLines={1}>
              Rp {new Intl.NumberFormat('id-ID').format(product.harga)}
            </Text>
          </View>
          <Text style={{color: product.status == 1 ? success : 'white'}}>
            {product.status == 1 ? 'Success' : 'Waiting for payment'}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          alignSelf: 'flex-end',
          padding: 10,
        }}>
          
        <TouchableOpacity
          style={{
            padding: 2,
            borderRadius: 5,
            backgroundColor: 'rgba(255,255,255,.07)',
          }}
          onPress={() =>
            nav.navigate('process', {
              orderid: product.id,
              theproduct: product,
            })
          }>
          <Text style={{color: info}}> details </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Orderlisted;
