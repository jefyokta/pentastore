import React from 'react';
import {ScrollView} from 'react-native';

const HorizontalScroll = ({children ,style}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[{marginTop: 0, marginBottom: 10, padding: 5},style]}>
      {children}
    </ScrollView>
  );
};

export default HorizontalScroll;
