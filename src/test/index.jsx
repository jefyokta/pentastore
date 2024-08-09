import {Button, SafeAreaView, Text ,View} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getRating} from '../components/Functions';
import {useEffect, useState} from 'react';
import Container from '../components/microcomponents/container';
import Orderlisted from '../components/microcomponents/orderlisted';
import DocumentPicker, {types} from 'react-native-document-picker';


const Test = () => {
    const [fileResponse, setFileResponse] = useState([]);
      const handleDocumentSelection = async () => {
        try {
          const response = await DocumentPicker.pick({
            type: [types.allFiles],
          });
          setFileResponse(response);
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            console.warn('User cancelled the picker');
          } else {
            console.error('Unknown Error: ', err);
            throw err;
          }
        }
      };

  // const dummy = [
  //   {
  //     id:'id',
  //     harga:20000,
  //     token:'token',
  //     status:1,
  //     product:'productfsdfdsvgdsvsdfsdfsdfefsfsafaf',
  //     link:'https;////',
  //     gambar:'default/jepi1',
  //     desc:null,
  //     type:'apple',
  //     tech:'reactnative',
  //     total:20000,
  //     tanggalpembelian:'2024-05-19',
  //   },
  //   {
  //     id:'id2',
  //     harga:20000,
  //     token:'token',
  //     status:0,
  //     product:'product',
  //     link:'https;////',
  //     gambar:'default/jepi1',
  //     desc:null,
  //     type:'apple',
  //     tech:'reactnative',
  //     total:20000,
  //     tanggalpembelian:'2024-05-19',
  //   },
  // ];
  return (
    <Container>
      <SafeAreaView style={{minHeight: '100%'}}>
        {/* <Orderlisted products={dummy}/> */}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Button title="Select Document" onPress={handleDocumentSelection} />
          {fileResponse.map((file, index) => (
            <Text key={index} style={{marginTop: 20,color:'white'}}>
              {file.name}
            </Text>
          ))}
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Test;
