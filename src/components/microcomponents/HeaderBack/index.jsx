import { View ,Text} from 'react-native'
import style from '../../style';

import Back from '../Backicon';


const HeaderBack = ({text})=>{
    return (
      <View
        style={{
          height: 100,
          padding: 20,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Back />
        <Text style={[style.headingtext, {color: 'white'}]}>{text}</Text>
      </View>
    );
}

export default HeaderBack