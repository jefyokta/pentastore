import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import style from '../style';
import axios from 'axios';
import ServerUri from '../../const';
import ProductsBox from './productsBox';
import Container from '../microcomponents/container';
import {bgcolor, boxcolor, info, kuning, textlight} from '../colors';
import {
  AppleIcon,
  CloudIcon,
  GameIcon,
  MessageIcon,
  WebAppIcon,
  SearchIcon
} from '../microcomponents/carticon/icon';
import HorizontalScroll from '../microcomponents/HorizontalScroll';
import Back from '../microcomponents/Backicon';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TextLight} from '../microcomponents/Text';
const Search = () => {
  const [hasilpencarian, setHasilpencarian] = useState([]);
  const [err, seterr] = useState({response: {data: {msg: 'buatan'}}});
  const route = useRoute();
  const navigator = useNavigation();
  const keyword = route.params.keyword;
  if (!keyword) navigator.goBack();
    const [search, setSearch] = useState(keyword);
    const [disabled, setdisable] = useState(true);

    const handle = text => {
      if (text == '' || text == null) {
        setdisable(true);
        setSearch(null)
      } else {
        setdisable(false);
        setSearch(text);
      }
    };

  const cari = async keyword => {
    
    if (keyword) {
      try {
        const response = await axios.get(
          `${ServerUri}/product/search?q=${keyword}`,
        );
        setHasilpencarian(response.data);
      } catch (error) {
        seterr(error);
        setHasilpencarian([]);
      }
    } else {
      setHasilpencarian([]);
    }
  };

  useEffect(() => {
    cari(keyword);
  }, [keyword]);

  return (
    <Container>
      <SafeAreaView>
        <ScrollView style={{minHeight: '100%'}}>
          <View
            style={{
              marginBottom: 50,
              paddingBottom: 50,
              minHeight: '100%',
            }}>
            <View
              style={{
                height: 70,
                padding: 20,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Back />
              <Text style={[style.headingtext, {color: 'white'}]}>Search</Text>
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
                value={search}
                placeholder="Find Product(s)....."
                placeholderTextColor={'rgba(255,255,255,.7)'}
                onChangeText={text => handle(text)}
                autoComplete="off"
                spellCheck={false}
                onSubmitEditing={text => handle(text)}
              />
              <TouchableOpacity
                onPress={() => navigator.navigate('search', {keyword: search})}
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
            <Text
              style={{
                color: kuning,
                // marginLeft: 20,
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>{`Result For "${keyword}"  (${hasilpencarian.length}) ${
              hasilpencarian.length > 1 ? 'items' : 'item'
            } found`}</Text>

            <View style={{padding: 0}}>
              <View style={{padding: 20}}>
                {hasilpencarian &&
                  hasilpencarian.map((product, i) => {
                    return (
                      <View key={i}>
                        <ProductsBox products={product} />
                      </View>
                    );
                  })}

                {hasilpencarian.length < 1 && (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: Dimensions.get('screen').height / 2,
                      borderColor: 'white',
                      margin: 10,
                      borderWidth: 0.3,
                      borderRadius: 10,
                      backgroundColor: 'rgba(255,255,255,.1)',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>{`No Result For "${keyword}"\n ( ${err.response.data.msg} )`}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

const CategoryBox = ({text, GameIcon, style, typ}) => {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      style={{
        width: 115,
        height: 115,
        backgroundColor: 'rgba(255,255,255,.2)',
        borderRadius: 10,
        position: 'relative',
        marginLeft: 20,
        overflow: 'hidden',
      }}
      onPress={() => nav.navigate('type', {type: typ})}>
      <GameIcon
        style={{position: 'relative', bottom: -20, width: 250, height: 250}}
      />
      <Text
        style={[
          {
            color: '#eaeaea',
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            bottom: 30,
            position: 'absolute',
            left: 10,
            color: textlight,
          },
          style,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
const CatBox = () => {
  return (
    <>
      <HorizontalScroll>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <CategoryBox typ={'game'} text={'Game'} GameIcon={GameIcon} />
          <CategoryBox typ={'web'} text={'Web'} GameIcon={WebAppIcon} />
          <CategoryBox typ={'cloud'} text={'Cloud'} GameIcon={CloudIcon} />
        </View>
      </HorizontalScroll>
      <HorizontalScroll>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <CategoryBox
            typ={'apple'}
            text={'Apple App'}
            GameIcon={AppleIcon}
            style={{bottom: 25, padding: 1, fontSize: 22}}
          />
          <CategoryBox typ={'chat'} text={'ChatApp'} GameIcon={MessageIcon} />
          <CategoryBox typ={'other'} text={'Other'} GameIcon={CloudIcon} />
        </View>
      </HorizontalScroll>
    </>
  );
};

export {Search, CatBox};
