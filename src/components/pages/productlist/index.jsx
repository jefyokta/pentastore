import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { bgcolor, boxcolor } from '../../colors';
import BuyButton from '../../microcomponents/buybutton';
import style from '../../style';
import ServerUri from '../../../const';
import ProductsBox from '../productsBox';


const ProducsList = ({ limit = 20, q = '' }) => {
  const [products, setProducts] = useState(null)
  useEffect(() => {
    const fetchProducts = async (limit = 20, q = '') => {
      try {
        const response = await axios.get(`${ServerUri}/product?limit=${limit}&q=${q}`);
        setProducts(response.data.data);

      } catch (error) {
        alert('idupin serper jepi tolol');
      }
    };

    fetchProducts(limit, q);
  }, []);


  return (
    <View style={{ padding: 20}}>
      {products && products.map((product,i) => (
        <ProductsBox products={product} key={i}/>
      ))}
    </View>

  )
}

export default ProducsList