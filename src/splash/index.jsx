import React, {useEffect} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import axios from 'axios';
import ServerUri from '../const';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getToken, getUserData} from '../sessionmanager';

const Splash = ({navigation}) => {
  useEffect(() => {
    const session = async () => {
      try {
       const result = await getToken();
       const result2 = await getUserData();
      //  console.log(result);
      //  console.log(result2);
       if (result && result2)navigation.navigate('home')
      
          
      } catch (error) {
          console.log(error)
          navigation.replace('main')
      }

    };

    session();
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <Text>Pentastore</Text>
      </View>
    </SafeAreaView>
  );
};
export default Splash;
