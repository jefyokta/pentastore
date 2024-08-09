import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import SvgUri from 'react-native-svg-uri-maintained';
import ServerUri from '../../../const';

const PentaIcon = ({fillw = 'black' ,style}) => {

  return (
    <>
      <View>
        <SvgUri
          width="30"
          height="30"
          source={require(`./icon/cart.svg`)}
         
          key={'cart'}
          fill={fillw}
        />
      </View>
    </>
  );
}

export default PentaIcon;
