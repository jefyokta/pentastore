import {
  ActivityIndicator,
  ActivityIndicatorBase,
  ActivityIndicatorComponent,
  Dimensions
} from 'react-native';
import {boxcolor, info} from '../../colors';
import {SafeAreaView} from 'react-native-safe-area-context';
 const width = Dimensions.get('window').width
 const height = Dimensions.get('window').height
const Loading = ({show}) => {
  return (
  
      <ActivityIndicator  animating={show} color={info} size={'large'} style={{position:'absolute',left:width/2.1,top:height/2,zIndex:9999}}/>

  )
}

export default Loading;
