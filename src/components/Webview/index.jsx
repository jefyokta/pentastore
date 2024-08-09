import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';

const PaymentHandler = ({token, visible, onclose}) => {
  if (token) {
    const url = `https://app.sandbox.midtrans.com/snap/v4/redirection/${token}`;
    // console.log(url);

    return (
      <Modal
        animationType="slide"
        visible={visible}
        transparent={true}
        onRequestClose={onclose}>
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            position: 'absolute',
            bottom: -20,
            height: '75%',
            padding: 15,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              padding: 10,
            }}>
            <TouchableOpacity onPress={onclose}>
              <Text style={{fontWeight: 900}}>X</Text>
            </TouchableOpacity>
          </View>
          <WebView
            source={{uri: url}}
            javaScriptEnabled={true}
            javaScriptCanOpenWindowsAutomatically={true}
            domStorageEnabled={true}
            cacheEnabled={true}
            allowFileAccessFromFileURLs={true}
            allowFileAccess={true}
            cacheMode="LOAD_NO_CACHE"
            bounces={false}
          />
        </View>
      </Modal>
    );
  }
  // else {
  //   return (
  //     <SafeAreaView>
  //       <View>
  //         <Text style={{ textAlign: 'center', color: 'red' }}>token tidak ada</Text>
  //       </View>
  //     </SafeAreaView>
  //   )
  // }
};

export default PaymentHandler;
