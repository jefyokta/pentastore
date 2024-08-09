import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import style from '../../style';
import PentaIcon from '../../microcomponents/carticon';
import {SearchIcon, NotifIcon} from '../../microcomponents/carticon/icon';
import {kuning} from '../../colors';

const Header = ({navigation, jumlahkeranjang}) => {
  const [search, setSearch] = useState();
  const [disabled, setdisable] = useState(true);

  const handle = text => {
    if (text == '' || text == null) {
      setdisable(true);
    } else {
      setdisable(false);
      setSearch(text);
    }
  };
  return (
    <View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text style={style.pentatitle}>penta</Text>
        <Text style={[style.pentatitle, {marginLeft: 0, color: 'white'}]}>
          store
        </Text>
      </View>

      <View
        style={{
          width: '100%',
          // display: 'flex',
          // flexDirection: 'row',
          // justifyContent: 'flex-end',
          // alignItems: 'center',
        }}>
        <View>
          <TouchableOpacity
            style={{
              marginRight: 50,
              position: 'relative',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
            onPress={() => navigation.navigate('cart')}>
            {jumlahkeranjang && jumlahkeranjang !== null && (
              <View
                style={{
                  borderRadius: 30,
                  backgroundColor: 'red',
                  position: 'absolute',
                  minWidth: 17,
                  height: 17,
                  zIndex: 9,
                  right: 0,
                  padding: 1,
                  // display:'flex'
                }}>
                <Text
                  style={{color: 'white', textAlign: 'center', fontSize: 11}}>
                  {jumlahkeranjang}
                </Text>
              </View>
            )}
            <PentaIcon fillw="white" svg={'cart'} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            position: 'relative',
            padding: 20,
            marginLeft: -15,
            paddingRight: 10,
          }}>
          <TextInput
            style={[
              style.inputstyle,
              {
                width: '100%',
                height: 40,
                backgroundColor: 'rgba(252, 202, 224, 0.1)',
              },
            ]}
            placeholder="Find Product(s)....."
            placeholderTextColor={'rgba(255,255,255,.7)'}
            onChangeText={text => handle(text)}
            autoComplete='off'
            spellCheck={false}
            onSubmitEditing={(text)=>handle(text)}
            
            
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('search', {keyword: search})}
            disabled={disabled}
            style={{
              right: 0,
              top: -2,
              maxHeight: 30,
              borderColor: 'white',
              position: 'absolute',
            }}>
            <SearchIcon fill="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;
