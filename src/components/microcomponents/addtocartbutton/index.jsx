import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage ,hideMessage} from 'react-native-flash-message';
import { boxcolor } from '../../colors';

const addTocart = async productId => {
  try {
    //   const res = await AsyncStorage.removeItem('@keranjang');
    //   console.log(res);
    let products = [];
    const Iskeranjang = await AsyncStorage.getItem('@keranjang');
    if (Iskeranjang) {
      products = JSON.parse(Iskeranjang);

      if (!products.includes(productId)) {
        products.push(productId);
      }
    }

   const result = await AsyncStorage.setItem('@keranjang', JSON.stringify(products));
  
    showMessage({
      message: 'berhasil menambahkan ke keranjang',
      type: 'success',
      backgroundColor: 'rgba(0, 50, 0, 0.5)',
    });
    //  console.log('Produk yang disimpan:', products);
    
   
  } catch (error) {
    console.log('Error:', error);
  }
}
const ButtonAddToCart = ({productId}) => {
  return (
    <TouchableOpacity
      style={{width: '100%', padding: 10,borderWidth:1,borderRadius:10,backgroundColor:boxcolor}}
      onPress={() => addTocart(productId)}>
      <Text style={{textAlign: 'center',color:'white'}}>Add to cart</Text>
    </TouchableOpacity>
  );
};

export {ButtonAddToCart,addTocart};
