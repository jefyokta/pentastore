import React, {useState, useEffect} from 'react';
import {Animated, View, StyleSheet, Dimensions , Text} from 'react-native';
import {pentared, third} from '../../colors';

const PentaLoading = ({show}) => {
  const maxh = Dimensions.get('screen').height;
  const maxw = Dimensions.get('screen').width;

  const [rotation] = useState(new Animated.Value(0));
  const [shows, setshow] = useState(false);
  useEffect(() => {
    setshow(show);
  }, [show]);

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1300,
        useNativeDriver: true,
      }),
    );

    rotateAnimation.start();

    return () => {
      rotateAnimation.stop();
    };
  }, [rotation]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={{
        position: 'absolute',
        height: maxh,
        width: maxw,
        display: shows == true ? 'flex' : 'none',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0000008e',
        zIndex: 999,
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          height: 70,
          width: maxw,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          transform: [{rotate}],
          zIndex: 999999,
        }}>
        <View
          style={{
            height: 70,
            width: 20,
            backgroundColor: pentared,
            marginRight: 10,
          }}></View>
        <View
          style={{
            height: 25,
            width: 25,
            backgroundColor: third,
            borderRadius: 50,
            alignSelf: 'center',
          }}></View>
        <View
          style={{
            height: 70,
            width: 20,
            backgroundColor: pentared,
            marginLeft: 10,
          }}></View>
      </Animated.View>
      <Text style={{zIndex: 999999999999, marginTop: 150,color:third , fontWeight:'bold'}}>Processing...</Text>
    </View>
  );
};

export default PentaLoading;
