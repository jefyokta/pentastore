import {Dimensions, ImageBackground, View, Platform} from 'react-native';
const height = Dimensions.get('screen').height;

const Container = ({children, otherstyle}) => {
  return (
    <View
      style={[
        {
          padding: 0,
          overflow: 'hidden',
            // borderRadius: 10,
            // marginBottom: 10,
            // marginTop: 10,
          height: height,
          backgroundColor: 'black',
        },
        otherstyle,
      ]}>
      {Platform.OS === 'ios' ? (
        <ImageBackground
          source={require('../../../asset/img/gradient2.png')}
          resizeMode="stretch">
          {children}
        </ImageBackground>
      ) : (
        {children}
      )}
    </View>
  );
};

export default Container;
