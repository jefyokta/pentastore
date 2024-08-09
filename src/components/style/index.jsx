import React from 'react';
import {StyleSheet} from 'react-native';
import {bgcolor, textlight, boxcolor, info, kuning} from '../colors';

const style = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  wrapper: {
    backgroundColor: '#eaeaea',
  },
  buttonText: {
    textAlign: 'center',
  },
  register: {
    textAlign: 'center',
    color: 'white',
  },
  header: {
    height: 150,
    padding: 20,
    // backgroundColor: boxcolor,
    position: 'fixed',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.45,
    shadowRadius: 5.84,
    elevation: 5,
  },
  pentatitle: {
    color: '#00ADB5',
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 20,
    // color:info
  },
  headerbutton: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 5,
    padding: 5,
    justifyContent: 'space-around',
  },
  headericon: {
    margin: 3,
    color: 'white',
  },
  text: {
    color: textlight,
  },
  bold: {
    fontWeight: 'bold',
  },
  box: {
    borderRadius: 10,
    // borderWidth: 1,
    // paddingTop: 5,
    height: 200,
    width: 200,
    // backgroundColor: boxcolor,
    margin: 5,
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    position: 'relative',
    // borderWidth: 1,
    // padding: 10,

    overflow: 'hidden',
    alignItems: 'center',
  },
  horizontalscroll: {
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: 'transparent',
  },
  borderLight: {
    borderWidth: 0.2,
    borderColor: 'white',
  },
  inputstyle: {
    borderRadius: 10,
    margin: 10,
    padding: 10,
    borderWidth: 0.6,
    borderColor: 'white',
    color: 'white',
  },
  inputstyle2: {
    borderRadius: 10,
    margin: 10,
    padding: 10,
    color: 'white',
    backgroundColor: '#00ADB5',
  },
  headingtext: {
    fontSize: 25,
    fontWeight: 900,
    color: 'white',
  },
  bordertipis: {
    borderWidth: 0.2,
    borderColor: 'rgba(255,255,255,.4)',
  },
});

export default style;
