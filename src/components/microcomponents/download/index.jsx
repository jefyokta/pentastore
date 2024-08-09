import {TouchableOpacity, Linking} from 'react-native';
import {TextLight} from '../Text';
import {showMessage, hideMessage}from 'react-native-flash-message';

const Download = url => {
  const openlink = async () => {
    console.log(url.url);
    const berhasil =await Linking.openURL(url.url);
    if (!berhasil) {
        showMessage({
            type:'danger',
            message:'gagal membuka link, coba buka manual'
        })
        
    }
  };
  return (
    <TouchableOpacity
      onPress={() => openlink()}
      style={{
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,

      }}>
      <TextLight text="Download" otherstyle={{textAlign:'center'}} />
    </TouchableOpacity>
  );
};

export default Download;
