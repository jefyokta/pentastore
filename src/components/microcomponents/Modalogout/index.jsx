import {Modal, View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import style from '../../style';
import {boxcolor, danger, info} from '../../colors';

const LogoutModal = () => {
  return (
    <SafeAreaView>
      <Modal visible={true} transparent={true} onRequestClose={false}>
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
            height: '30%',
            padding: 20,
          }}>
          <View>
            <Text
              style={[
                style.headingtext,
                {color: boxcolor, fontFamily: 'Arial'},
              ]}>
              Wanna logout?
            </Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: info,
                borderRadius: 10,
                padding: 20,
                margin: 20,
                marginBottom: 5,
              }}>
              <Text
                style={{fontSize: 17, textAlign: 'center', fontWeight: 'bold'}}>
                No, i want to stay
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: danger,
                borderRadius: 10,
                padding: 20,
                margin: 20,
                marginTop: 5,
              }}>
              <Text
                style={{fontSize: 17, textAlign: 'center', fontWeight: 'bold'}}>
                Yep :(
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LogoutModal;
