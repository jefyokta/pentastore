import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import axios from 'axios';
import Auth from './auth';
import ServerUri from './const';
import FlashMessage from 'react-native-flash-message'

const Stack = createNativeStackNavigator()


const App = () => {
  axios.get(`${ServerUri}`).then(res => console.log(res.data.msg)).catch(err => alert('idupin serper jepi tolol'))



  return (
    <>

      <NavigationContainer>
        <Auth />
      </NavigationContainer>
      <FlashMessage position={'center'}/>
    </>
  );
};

export default App;
